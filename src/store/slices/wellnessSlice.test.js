import { describe, it, expect } from 'vitest';
import wellnessReducer, { addJournalLocal, addMoodLogLocal, addFocusSessionLocal, clearWellnessData } from './wellnessSlice';

describe('wellnessSlice reducer', () => {
  const initialState = {
    journals: [],
    moodLogs: [],
    focusSessions: [],
    streaks: { current: 0, lastLogin: null },
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(wellnessReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addJournalLocal', () => {
    const journalEntry = { id: '1', date: '2026-06-13', text: 'I am studying' };
    const actual = wellnessReducer(initialState, addJournalLocal(journalEntry));
    expect(actual.journals).toHaveLength(1);
    expect(actual.journals[0]).toEqual(journalEntry);
  });

  it('should handle addMoodLogLocal', () => {
    const moodLog = { id: '1', date: '2026-06-13', mood: 90 };
    const actual = wellnessReducer(initialState, addMoodLogLocal(moodLog));
    expect(actual.moodLogs).toHaveLength(1);
    expect(actual.moodLogs[0].mood).toEqual(90);
  });

  it('should handle addFocusSessionLocal', () => {
    const session = { id: '1', date: '2026-06-13', durationMinutes: 25, type: 'pomodoro' };
    const actual = wellnessReducer(initialState, addFocusSessionLocal(session));
    expect(actual.focusSessions).toHaveLength(1);
    expect(actual.focusSessions[0].durationMinutes).toEqual(25);
  });

  it('should handle clearWellnessData', () => {
    const populatedState = {
      ...initialState,
      journals: [{ id: '1', text: 'Old entry' }],
      moodLogs: [{ id: '1', mood: 50 }],
      streaks: { current: 5, lastLogin: 'yesterday' }
    };
    const actual = wellnessReducer(populatedState, clearWellnessData());
    expect(actual.journals).toEqual([]);
    expect(actual.moodLogs).toEqual([]);
    expect(actual.streaks).toEqual({ current: 0, lastLogin: null });
  });
});
