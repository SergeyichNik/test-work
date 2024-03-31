import { createSlice } from '@reduxjs/toolkit';
import { type EventItem, type EventsStateSchema, type ReducerType } from './types';

const initialState: EventsStateSchema = {
  events: {}
};

const _addNewEvent: ReducerType<{ date: string, event: EventItem }> = (state, action) => {
  const { date, event } = action.payload;

  if (!state.events[date]) {
    state.events[date] = [];
  }

  state.events[date].push(event);
};

const _removeEvent: ReducerType<{ date: string, id: string }> = (state, action) => {
  const { date, id } = action.payload;
  const eventIndex = state.events[date].findIndex((el) => el.id === id);

  if (eventIndex !== -1) {
    state.events[date].splice(eventIndex, 1);
  }

  if (state.events[date].length === 0) {
    delete state.events[date];
  }
};

const _updateEvent: ReducerType<{ date: string, updatedEvent: EventItem }> = (state, action) => {
  const { date, updatedEvent } = action.payload;

  const eventIndex = state.events[date].findIndex((el) => el.id === updatedEvent.id);

  if (eventIndex !== -1) {
    state.events[date][eventIndex] = updatedEvent;
  }

  if (state.events[date].length === 0) {
    delete state.events[date];
  }
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addNewEvent: _addNewEvent,
    removeEvent: _removeEvent,
    updateEvent: _updateEvent
  }
});

export const { reducer: eventsReducer } = eventsSlice;
export const { addNewEvent, removeEvent, updateEvent } = eventsSlice.actions;
