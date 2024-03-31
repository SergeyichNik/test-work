import { useSearchParams } from 'react-router-dom';
import { type CalendarMode } from 'antd/es/calendar/generateCalendar';
import { useEffect } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { DATE_KEY_FORMAT } from 'shared/constants';

enum SearchParams {
  MODE = 'mode',
  DATE = 'date',
}

const initialState = {
  [SearchParams.DATE]: dayjs().format(DATE_KEY_FORMAT),
  [SearchParams.MODE]: 'month'
};

export const useCalendarPanelControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get(SearchParams.MODE) as CalendarMode;
  const date = searchParams.get(SearchParams.DATE);

  useEffect(() => {
    if (searchParams.size === 0 || !dayjs(date).isValid() || !mode) {
      setSearchParams(initialState);
    }
  }, [searchParams]);

  const onModeAndDateChangeHandle = (nextDate: Dayjs, mode: CalendarMode) => {
    searchParams.set(SearchParams.DATE, dayjs(nextDate).format(DATE_KEY_FORMAT));
    searchParams.set(SearchParams.MODE, mode);
    setSearchParams(searchParams);
  };

  return {
    mode,
    date,
    searchParams,
    onModeAndDateChangeHandle
  };
};
