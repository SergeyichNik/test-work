import dayjs from 'dayjs';
import { Button, Flex, Typography } from 'antd';

import { useForm } from 'react-hook-form';
import { Timepicker } from './ui/TimePicker';
import { RemindTimeSelect } from './ui/RemindTimeSelect';
import { type EventFormSubmitData, type FormValues } from './types';
import { TitleInput } from './ui/TitleInput';
import { reminderOptions } from '../../config/constants';

type EventFormProps = {
  defaultValues?: Partial<FormValues>
  submitButtonTitle: string
  onCancel: () => void
  onSubmit: (data: EventFormSubmitData) => void
  contextDate?: string | undefined
};

export const EventForm = ({ contextDate, submitButtonTitle, defaultValues, onCancel, onSubmit }: EventFormProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues
  });

  const onSubmitHandle = () => {
    handleSubmit(({ title, remind, dateRange }) => {
      let dateIsoStringRange;
      if (contextDate) {
        const dateObj = dayjs(contextDate);

        dateIsoStringRange = dateRange.map((el) => {
          return el
            .set('year', dateObj.get('year'))
            .set('month', dateObj.get('month'))
            .set('date', dateObj.get('date'))
            .toISOString();
        });
      } else {
        dateIsoStringRange = dateRange.map((el) => dayjs(el).toISOString());
      }

      onSubmit({
        dateIsoStringRange,
        title,
        remind
      });
    })();
  };

  return (
    <Flex vertical gap={16}>
      <TitleInput rules={{ required: true }} control={control} name={'title'}/>

      <Timepicker
        rules={{
          required: true,
          validate: (value) => {
            return Array.isArray(value) && value.every(el => el);
          }
        }}
        name={'dateRange'} control={control}
      />

      <Flex gap={16} align={'center'} justify={'flex-end'}>
        <Typography.Text>
            Напомнить до начала за
        </Typography.Text>
        <RemindTimeSelect options={reminderOptions} name={'remind'} control={control}/>
      </Flex>

      <Flex gap={16}>
        <Button type={'primary'} onClick={onSubmitHandle}>
          {submitButtonTitle}
        </Button>
        <Button danger type={'text'} onClick={onCancel}>Отменить</Button>
      </Flex>

    </Flex>
  );
};
