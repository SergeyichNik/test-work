import * as dayjs from 'dayjs';
import { type Dayjs } from 'dayjs';
import { Calendar as AntdCalendar, type CalendarProps, Spin, Tag, Tooltip } from 'antd';
import { DATE_KEY_FORMAT } from 'shared/constants';
import { type SelectInfo } from 'antd/es/calendar/generateCalendar';
import { useAppNavigate, useAppSelector } from 'shared/hooks';
import { selectEvents } from 'shared/selectors';
import { useCalendarPanelControl } from './useCalendarPanelControl';

export const Calendar = () => {
  const {
    date,
    mode,
    onModeAndDateChangeHandle
  } = useCalendarPanelControl();

  const events = useAppSelector(selectEvents);
  const navigate = useAppNavigate();

  const dateCellRender = (value: Dayjs) => {
    const formatDate = dayjs(value).format(DATE_KEY_FORMAT);
    const listData = events?.[formatDate];
    if (listData) {
      return (
        <>
          {listData.map((event, i) => (
            <Tooltip key={event.id} title={event.title}>
              <Tag
                color={event.tagColor}
                onClick={(e) => {
                  e.stopPropagation();
                  const date = dayjs(event.dateIsoStringRange[0]).format(DATE_KEY_FORMAT);
                  navigate(`list/${date}`);
                  navigate(`list/${date}/event/${event.id}`);
                }}
              >
                {event.title}
              </Tag>
            </Tooltip>
          ))}
        </>
      );
    }

    return null;
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
  };

  if (!date) {
    return <Spin/>;
  }

  const onDateClick = (_date: Dayjs, select: SelectInfo) => {
    if (select.source === 'date') {
      const date = dayjs(_date).format(DATE_KEY_FORMAT);
      navigate(`/list/${date}`);
    }
  };

  return (
    <AntdCalendar
      mode={mode}
      onPanelChange={onModeAndDateChangeHandle}
      defaultValue={dayjs(date)}
      onSelect={onDateClick}
      cellRender={cellRender}
    />

  );
};
