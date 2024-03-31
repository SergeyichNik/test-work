import { App as AntdApp, Typography } from 'antd';
import { type EventItem, updateEvent } from 'entities/event';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useAppNavigate, useAppDispatch } from 'shared/hooks';
import { useReminder } from './useReminder';

export const ReminderNotifications = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { notification } = AntdApp.useApp();

  const setReminderSeen = (event: EventItem, date: string) => {
    const currentTime = dayjs().toISOString();

    const updatedEvent = {
      ...event,
      reminderSeenAt: currentTime
    };

    dispatch(updateEvent({ date, updatedEvent }));
  };

  const showReminder = (event: EventItem, date: string) => {
    const key = uuidv4();
    notification.info({
      onClick: () => {
        navigate(`list/${date}/event/${event.id}`);
        notification.destroy(key);
      },
      onClose: () => {
        setReminderSeen(event, date);
      },
      key,
      message: <Typography.Link strong>{event.title}</Typography.Link>,
      description: 'Событие скоро начнётся',
      placement: 'topLeft'
    });
  };

  useReminder(showReminder);

  return null;
};
