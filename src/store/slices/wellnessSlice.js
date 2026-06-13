import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  journals: [],
  moodLogs: [],
  focusSessions: [],
  streaks: {
    current: 0,
    lastLogin: null,
  },
};

export const wellnessSlice = createSlice({
  name: 'wellness',
  initialState,
  reducers: {
    addJournal: (state, action) => {
      state.journals.unshift({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...action.payload,
      });
    },
    addMoodLog: (state, action) => {
      state.moodLogs.unshift({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mood: action.payload,
      });
    },
    addFocusSession: (state, action) => {
      state.focusSessions.unshift({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        durationMinutes: action.payload.duration,
        type: action.payload.type, // 'pomodoro', 'short_break', etc.
      });
    },
    checkLoginStreak: (state) => {
      const today = new Date().toDateString();
      if (!state.streaks.lastLogin) {
        state.streaks.current = 1;
        state.streaks.lastLogin = today;
      } else {
        const lastDate = new Date(state.streaks.lastLogin);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          state.streaks.current += 1;
          state.streaks.lastLogin = today;
        } else if (diffDays > 1) {
          state.streaks.current = 1;
          state.streaks.lastLogin = today;
        }
        // If 0 days (same day), do nothing
      }
    }
  },
});

export const { addJournal, addMoodLog, addFocusSession, checkLoginStreak } = wellnessSlice.actions;
export default wellnessSlice.reducer;
