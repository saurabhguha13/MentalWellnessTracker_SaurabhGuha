import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import wellnessReducer from './slices/wellnessSlice';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(key, value) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? 
  {
    getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key, item) => Promise.resolve(window.localStorage.setItem(key, item)),
    removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key))
  } : createNoopStorage();

const persistConfig = {
  key: 'mental-wellness-tracker-root',
  storage,
};

const persistedWellnessReducer = persistReducer(persistConfig, wellnessReducer);
const persistedAuthReducer = persistReducer(
  { key: 'mental-wellness-tracker-auth', storage }, 
  authReducer
);
const persistedChatReducer = persistReducer(
  { key: 'mental-wellness-tracker-chat', storage },
  chatReducer
);

export const store = configureStore({
  reducer: {
    wellness: persistedWellnessReducer,
    auth: persistedAuthReducer,
    chat: persistedChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
