import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query, orderBy, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const initialState = {
  journals: [],
  moodLogs: [],
  focusSessions: [],
  streaks: {
    current: 0,
    lastLogin: null,
  },
  loading: false,
  error: null,
};

// --- Async Thunks for Firestore ---

export const fetchUserData = createAsyncThunk(
  'wellness/fetchUserData',
  async (uid, { rejectWithValue }) => {
    try {
      // Fetch Journals
      const journalsQuery = query(collection(db, 'users', uid, 'journals'), orderBy('date', 'desc'));
      const journalsSnapshot = await getDocs(journalsQuery);
      const journals = journalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch Mood Logs
      const moodLogsQuery = query(collection(db, 'users', uid, 'moodLogs'), orderBy('date', 'desc'));
      const moodLogsSnapshot = await getDocs(moodLogsQuery);
      const moodLogs = moodLogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch Focus Sessions
      const focusQuery = query(collection(db, 'users', uid, 'focusSessions'), orderBy('date', 'desc'));
      const focusSnapshot = await getDocs(focusQuery);
      const focusSessions = focusSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch Streaks
      const streakDoc = await getDoc(doc(db, 'users', uid, 'streaks', 'current'));
      let streaks = { current: 0, lastLogin: null };
      if (streakDoc.exists()) {
        streaks = streakDoc.data();
      }

      return { journals, moodLogs, focusSessions, streaks };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addJournalToCloud = createAsyncThunk(
  'wellness/addJournalToCloud',
  async ({ uid, journalData }, { rejectWithValue }) => {
    try {
      const entry = {
        date: new Date().toISOString(),
        ...journalData,
      };
      const docRef = await addDoc(collection(db, 'users', uid, 'journals'), entry);
      return { id: docRef.id, ...entry };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMoodLogToCloud = createAsyncThunk(
  'wellness/addMoodLogToCloud',
  async ({ uid, mood }, { rejectWithValue }) => {
    try {
      const entry = {
        date: new Date().toISOString(),
        mood,
      };
      const docRef = await addDoc(collection(db, 'users', uid, 'moodLogs'), entry);
      return { id: docRef.id, ...entry };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFocusSessionToCloud = createAsyncThunk(
  'wellness/addFocusSessionToCloud',
  async ({ uid, durationMinutes, type }, { rejectWithValue }) => {
    try {
      const entry = {
        date: new Date().toISOString(),
        durationMinutes,
        type,
      };
      const docRef = await addDoc(collection(db, 'users', uid, 'focusSessions'), entry);
      return { id: docRef.id, ...entry };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStreakInCloud = createAsyncThunk(
  'wellness/updateStreakInCloud',
  async ({ uid, currentStreak, lastLogin }, { rejectWithValue }) => {
    try {
      const streakData = { current: currentStreak, lastLogin };
      await setDoc(doc(db, 'users', uid, 'streaks', 'current'), streakData);
      return streakData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const wellnessSlice = createSlice({
  name: 'wellness',
  initialState,
  reducers: {
    // Keep local version for immediate UI updates if offline or while cloud updates
    addJournalLocal: (state, action) => {
      state.journals.unshift(action.payload);
    },
    addMoodLogLocal: (state, action) => {
      state.moodLogs.unshift(action.payload);
    },
    addFocusSessionLocal: (state, action) => {
      state.focusSessions.unshift(action.payload);
    },
    clearWellnessData: (state) => {
      state.journals = [];
      state.moodLogs = [];
      state.focusSessions = [];
      state.streaks = { current: 0, lastLogin: null };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Data
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.journals = action.payload.journals;
        state.moodLogs = action.payload.moodLogs;
        state.focusSessions = action.payload.focusSessions;
        state.streaks = action.payload.streaks;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Journal
      .addCase(addJournalToCloud.fulfilled, (state, action) => {
        // Only add if it wasn't already added optimistically
        const exists = state.journals.find(j => j.id === action.payload.id);
        if (!exists) state.journals.unshift(action.payload);
      })
      // Add Mood
      .addCase(addMoodLogToCloud.fulfilled, (state, action) => {
        const exists = state.moodLogs.find(m => m.id === action.payload.id);
        if (!exists) state.moodLogs.unshift(action.payload);
      })
      // Add Focus Session
      .addCase(addFocusSessionToCloud.fulfilled, (state, action) => {
        const exists = state.focusSessions.find(f => f.id === action.payload.id);
        if (!exists) state.focusSessions.unshift(action.payload);
      })
      // Streak Update
      .addCase(updateStreakInCloud.fulfilled, (state, action) => {
        state.streaks = action.payload;
      });
  }
});

export const { addJournalLocal, addMoodLogLocal, addFocusSessionLocal, clearWellnessData } = wellnessSlice.actions;
export default wellnessSlice.reducer;
