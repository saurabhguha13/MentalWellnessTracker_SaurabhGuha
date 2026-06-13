import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // { name, email }
    isAuthenticated: false,
    apiKey: '',
  },
  reducers: {
    login: (state, action) => {
      // Mock login/signup logic
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // We don't wipe the API key on logout for convenience
    },
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    }
  }
});

export const { login, logout, setApiKey } = authSlice.actions;
export default authSlice.reducer;
