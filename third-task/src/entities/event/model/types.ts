import { type CaseReducer, type PayloadAction } from '@reduxjs/toolkit';

export type EventItem = {
  id: string
  title: string
  dateIsoStringRange: [string, string]
  remind: number
  reminderSeenAt: string | null
  tagColor: string
};

export type EventsStateSchema = {
  events: Record<string, EventItem[]>
};

export type ReducerType<Payload> = CaseReducer<EventsStateSchema, PayloadAction<Payload>>;
