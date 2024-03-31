import { type RootState } from '../app/store';

export const selectEvents = (state: RootState) => {
  return state.eventsReducer?.events || {};
};
