import { createRoot } from 'react-dom/client';
import App from './src/App';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { BrowserRouter } from 'react-router-dom';
import { servicesApi } from './src/shared/api';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <ApiProvider api={servicesApi}>
      <App/>
    </ApiProvider>
  </BrowserRouter>
);
