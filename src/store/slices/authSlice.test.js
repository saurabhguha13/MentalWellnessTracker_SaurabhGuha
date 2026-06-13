import { describe, it, expect } from 'vitest';
import authReducer, { setUser } from './authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    user: null, 
    isAuthenticated: false,
    apiKey: '',
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const user = { uid: '123', email: 'test@example.com', name: 'Test User' };
    const actual = authReducer(initialState, setUser(user));
    
    expect(actual.user).toEqual(user);
    expect(actual.isAuthenticated).toEqual(true);
    expect(actual.loading).toEqual(false);
  });

  it('should handle logout via setUser(null)', () => {
    const loggedInState = {
      ...initialState,
      user: { uid: '123', email: 'test@example.com', name: 'Test User' },
      isAuthenticated: true,
      loading: false,
    };
    const actual = authReducer(loggedInState, setUser(null));
    
    expect(actual.user).toEqual(null);
    expect(actual.isAuthenticated).toEqual(false);
    expect(actual.loading).toEqual(false);
  });
});
