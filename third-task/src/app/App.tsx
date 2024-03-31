import { type FunctionComponent } from 'react';
import { App as AntdApp } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { Container } from './Container';
import { EventsList, EventView } from 'entities/event';
import { EventEditForm } from 'features/EventEditForm';
import { EventCreateForm } from 'features/EventCreateForm';

const App: FunctionComponent = () => {
  return (
    <AntdApp>
      <Routes>
        <Route path={'/'} element={<Container/>}>
          <Route path={'list/:date'} element={<EventsList/>}>
            <Route path={'event/:id'} element={<EventView/>}/>
            <Route path={'event/edit/:id'} element={<EventEditForm/>}/>
            <Route path={'event/create'} element={<EventCreateForm/>}/>
          </Route>
        </Route>
        <Route path={'/*'} element={<Container/>} />
      </Routes>
    </AntdApp>
  );
};

export default App;
