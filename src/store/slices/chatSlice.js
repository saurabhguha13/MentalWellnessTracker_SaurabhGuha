import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    { id: 1, sender: 'bot', text: 'Hi there! I am your Samridhi Companion. How are you feeling about your studies today?' }
  ]
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = initialState.messages;
    }
  }
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
