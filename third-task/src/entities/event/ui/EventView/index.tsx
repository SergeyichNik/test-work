import { Flex, Typography } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from 'shared/hooks';
import { Navigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { type RoutesParams } from 'shared/navigation.types';
import { selectEvents } from 'shared/selectors';

export const EventView = () => {
  const { id, date } = useParams<RoutesParams>();
  const events = useAppSelector(selectEvents);

  const event = events[date]?.find((el) => el.id === id);

  if (!event) {
    return <Navigate to={'/'}/>;
  }

  return (
    <>
      <Flex>
        <Typography.Title level={4}>{event.title}</Typography.Title>
      </Flex>
      {event.dateIsoStringRange.map((el, i) => {
        return (
          <Flex key={i} gap={15}>
            <Typography.Text>{i === 0 ? 'Начало:' : 'Конец:'}</Typography.Text>
            <Flex gap={5}>
              <CalendarOutlined/>
              <Typography.Text>{dayjs(el).format('D MMMM, YYYY')}</Typography.Text>
            </Flex>
            <Flex gap={5}>
              <ClockCircleOutlined />
              <Typography.Text>{dayjs(el).format('HH:mm')}</Typography.Text>
            </Flex>
          </Flex>
        );
      })}

      <Typography.Text>Напомнить заранее: {event.remind} мин</Typography.Text>
    </>
  );
};
