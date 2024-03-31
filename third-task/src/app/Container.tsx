import { Calendar } from 'widgets/Calendar';
import { Outlet, useMatch } from 'react-router-dom';
import { useAppNavigate } from 'shared/hooks';
import { Drawer } from 'antd';
import { ReminderNotifications } from 'features/ReminderNotifications';

export const Container = () => {
  const navigate = useAppNavigate();

  const eventListView = useMatch('/list/:date/*');

  const onCloseHandle = () => {
    navigate(-1);
  };

  return (
    <>
      <ReminderNotifications/>
      <Calendar/>
      <Drawer
        size={'large'}
        onClose={onCloseHandle}
        open={!!eventListView}>
        <Outlet/>
      </Drawer>
    </>
  );
};
