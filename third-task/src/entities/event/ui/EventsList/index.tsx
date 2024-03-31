import { Button, Drawer, List } from 'antd';
import { Outlet, useMatch, useParams } from 'react-router-dom';
import { useAppNavigate, useAppDispatch, useAppSelector } from 'shared/hooks';
import { type RoutesParams } from 'shared/navigation.types';
import { ListItem } from './ui/ListItem';
import dayjs from 'dayjs';
import { DATE_HH_MM } from 'shared/constants';
import { removeEvent } from '../../index';
import { selectEvents } from 'shared/selectors';

export const EventsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();

  const match = useMatch('/list/:date/event/*');

  const { date } = useParams<RoutesParams>();

  const events = useAppSelector(selectEvents);

  const removeEventById = (id: string) => {
    if (date) {
      dispatch(removeEvent({ date, id }));
    }
  };

  const onCloseHandle = () => {
    navigate(-1);
  };

  return (
    <>
      <Drawer
        onClose={onCloseHandle}
        open={!!match}
      >
        <Outlet/>
      </Drawer>
      {events[date]?.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={events[date]}
          renderItem={({ id, title, dateIsoStringRange }) => (
            <ListItem
              onEditClick={() => navigate(`event/edit/${id}`)}
              onRemoveClick={() => removeEventById(id)}
              onTitleClick={() => navigate(`event/${id}`)}
              title={title}
              description={dateIsoStringRange.reduce((start, end) => {
                return `с ${dayjs(start).format(DATE_HH_MM)} до ${dayjs(end).format(DATE_HH_MM)}`;
              })}
            />
          )}
        />)}

      <Button
        onClick={() => navigate('event/create')}
        type={'primary'}>Добавить событие +</Button>

    </>
  );
};
