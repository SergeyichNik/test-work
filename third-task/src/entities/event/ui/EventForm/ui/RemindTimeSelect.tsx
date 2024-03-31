import { useController, type UseControllerProps } from 'react-hook-form';
import { Select, type SelectProps } from 'antd';
import { type FormValues } from '../types';

export type RemindTimeSelectProps = {
  options: SelectProps['options']
};

export function RemindTimeSelect (props: UseControllerProps<FormValues> & RemindTimeSelectProps) {
  const {
    field: { value, onChange }
  } = useController(props);

  return (
    <Select
      onSelect={(value) => onChange(value)}
      value={value}
      style={{ width: '100px' }}
      options={props.options}
    />
  );
}
