import { useController, type UseControllerProps } from 'react-hook-form';
import { Input } from 'antd';
import { type FormValues } from '../types';

export function TitleInput (props: UseControllerProps<FormValues>) {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController(props);
  return (
    <Input
      status={error ? 'error' : ''}
      onChange={onChange}
      value={value}
      placeholder={'Название события'}
    />
  );
}
