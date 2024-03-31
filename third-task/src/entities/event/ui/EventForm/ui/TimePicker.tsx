import { useController, type UseControllerProps } from 'react-hook-form';
import { TimePicker } from 'antd';
import { type FormValues } from '../types';
import { DATE_HH_MM } from 'shared/constants';

export function Timepicker (props: UseControllerProps<FormValues>) {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController(props);

  return (
    <TimePicker.RangePicker
      status={error ? 'error' : ''}
      value={value}
      use12Hours={false}
      onCalendarChange={onChange}
      format={DATE_HH_MM}
    />
  );
}
