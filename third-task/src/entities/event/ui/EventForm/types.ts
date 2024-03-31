import { type Dayjs } from 'dayjs';
import { type EventItem } from '../../model/types';

export type EventFormSubmitData = Omit<EventItem, 'id' | 'reminderSeenAt' | 'tagColor'>;

export type FormValues = {
  title: string
  dateRange: [Dayjs, Dayjs]
  remind: number
};
