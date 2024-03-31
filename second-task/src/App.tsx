import { type FunctionComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ServicesList from './pages/ServicesList';
import ServiceDetails from './pages/ServiceDetails';

const App: FunctionComponent = () => {
  return (
    <Routes>
      <Route path={'/'} element={<ServicesList/>}/>
      <Route path={'/:id/details'} element={<ServiceDetails/>} />
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
  );
};

export default App;
