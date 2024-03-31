import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { type RoutesParams } from 'shared/navigation.types';
import { useAppNavigate, useAppDispatch } from 'shared/hooks';
import { App } from 'antd';
import { addNewEvent, EventForm, type EventFormSubmitData, type EventItem, reminderOptions } from 'entities/event';
import { getRandomColor } from 'shared/utils';

export const EventCreateForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();

  const { date } = useParams<RoutesParams>();
  const { notification } = App.useApp();

  const showSuccessNotification = () => {
    notification.success({
      message: 'Вы успешно создали событие',
      placement: 'topLeft'
    });
  };

  const createEventSubmit = (data: EventFormSubmitData) => {
    const id = uuidv4();
    const event: EventItem = {
      id,
      reminderSeenAt: null,
      tagColor: getRandomColor(),
      ...data
    };
    if (date) {
      dispatch(addNewEvent({ date, event }));
      showSuccessNotification();
      navigate(-1);
    }
  };

  const cancelCreate = () => {
    navigate(-1);
  };

  return (
    <EventForm
      defaultValues={{
        remind: reminderOptions[0].value
      }}
      contextDate={date}
      submitButtonTitle={'Создать'}
      onCancel={cancelCreate}
      onSubmit={createEventSubmit}
    />
  );
};
