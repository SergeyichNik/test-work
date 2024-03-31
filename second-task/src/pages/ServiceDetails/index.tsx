import { type FunctionComponent } from 'react';
import { useGetServicesByIdQuery } from '../../shared/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, Result, Skeleton } from 'antd';
import { isEmpty } from '../../shared/utils';

const ServiceDetails: FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isSuccess, isFetching, isError, refetch } = useGetServicesByIdQuery(id ?? '');

  const onGoBackClickHandle = (): void => {
    navigate(-1);
  };

  return (
    <Skeleton loading={isFetching} active>
      {isError && (
        <Result
          status="500"
          title="500"
          subTitle="Произошла ошибка"
          extra={<Button onClick={refetch} type="primary">Повторить запрос</Button>}
        />
      )}

      {isSuccess && !isEmpty(data) && (
        <Descriptions title={data?.name}>
          <Descriptions.Item label='Описание'>{data?.content}</Descriptions.Item>
          <Descriptions.Item label='Стоимость'>{data?.price}</Descriptions.Item>
        </Descriptions>
      ) }

      {isSuccess && isEmpty(data) && (
        <Result
          status="404"
          title="404"
          subTitle="'Услуга не найдена'"
          extra={<Button type={'primary'} onClick={onGoBackClickHandle}>Вернуться назад</Button>}
        />
      )}
    </Skeleton>
  );
};

export default ServiceDetails;
