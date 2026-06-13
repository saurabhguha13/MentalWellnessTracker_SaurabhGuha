import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import wellnessReducer from './slices/wellnessSlice';

const persistConfig = {
  key: 'mental-wellness-tracker-root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, wellnessReducer);

export const store = configureStore({
  reducer: {
    wellness: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
