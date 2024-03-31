import { useNavigate } from 'react-router-dom';
import { useGetServicesQuery } from '../../shared/api';
import { type FunctionComponent } from 'react';
import { Alert, Button, Card, List, Result } from 'antd';

const grid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
  xxl: 3
};

const ServicesList: FunctionComponent = () => {
  const navigate = useNavigate();
  const { isFetching, isError, data, refetch } = useGetServicesQuery();

  return (
    <>
      {!isFetching && isError
        ? (
          <Result
            status="500"
            title="500"
            subTitle="Произошла ошибка"
            extra={<Button onClick={refetch} type="primary">Повторить запрос</Button>}
          />
        ) : (
          <List
            loading={isFetching}
            grid={grid}
            dataSource={data}
            renderItem={({ id, name, price }) => (
              <List.Item>
                <Card style={{ flexGrow: 1 }} key={id} title={name} extra={<a onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${id}/details`);
                }} href="#">Детали</a>}>
                  <p>{price}</p>
                </Card>
              </List.Item>
            )}
          />
        )}

    </>
  );
};

export default ServicesList;
