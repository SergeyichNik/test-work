import { Navigate, useParams } from 'react-router-dom';
import { type RoutesParams } from 'shared/navigation.types';
import { useAppNavigate, useAppSelector, useAppDispatch } from 'shared/hooks';
import dayjs from 'dayjs';
import { EventForm, type EventFormSubmitData, updateEvent } from 'entities/event';
import { selectEvents } from 'shared/selectors';

export const EventEditForm = () => {
  const { date, id } = useParams<RoutesParams>();
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEvents);

  const event = events[date]?.find((el) => el.id === id);

  if (!event) {
    return <Navigate to={'/'}/>;
  }

  const updateEventOnSubmit = (data: EventFormSubmitData) => {
    const updatedEvent = {
      ...event,
      ...data
    };
    if (date) {
      dispatch(updateEvent({ date, updatedEvent }));
      navigate(-1);
    }
  };

  const cancelCreate = () => {
    navigate(-1);
  };

  return (
    <EventForm
      defaultValues={{
        title: event.title,
        remind: event.remind,
        dateRange: event.dateIsoStringRange?.map((el) => dayjs(el))
      }}
      submitButtonTitle={'Сохранить изменения'}
      onCancel={cancelCreate}
      onSubmit={updateEventOnSubmit}
    />
  );
};
