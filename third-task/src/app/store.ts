import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { eventsReducer, type EventsStateSchema } from 'entities/event';

export interface RootState {
  eventsReducer: EventsStateSchema
}

const persistConfig = {
  key: 'root',
  storage
};

const combinedReducer = combineReducers({
  eventsReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
