import { type EventItem } from 'entities/event';
import dayjs from 'dayjs';
import { DATE_KEY_FORMAT } from 'shared/constants';
import { useAppSelector } from 'shared/hooks';
import { selectEvents } from 'shared/selectors';
import { useEffect } from 'react';

const ONE_MINUTE_DELAY = 60000;

export const useReminder = (onEvent: (event: EventItem, date: string) => void) => {
  const date = dayjs();
  const dateKey = date.format(DATE_KEY_FORMAT);
  const events = useAppSelector(selectEvents);

  const currentDateEventsList = events[dateKey] || [];

  useEffect(() => {
    const checkEventsForRemind = () => {
      for (const event of currentDateEventsList) {
        const withRemindDate = date.add(event.remind, 'minute');
        const targetDate = dayjs(event.dateIsoStringRange[0]);

        if (
          withRemindDate.isAfter(targetDate) &&
            !date.isAfter(targetDate) &&
            !event.reminderSeenAt
        ) {
          onEvent(event, dateKey);
        }
      }
    };

    checkEventsForRemind();

    const intervalId = setInterval(() => {
      checkEventsForRemind();
    }, ONE_MINUTE_DELAY);

    return () => {
      clearInterval(intervalId);
    };
  }, [events]);
};
