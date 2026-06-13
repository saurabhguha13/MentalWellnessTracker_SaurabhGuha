import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import wellnessReducer from './slices/wellnessSlice';
import authReducer from './slices/authSlice'; // Planning ahead for Auth

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
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

export const store = configureStore({
  reducer: {
    wellness: persistedWellnessReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
