import { createRoot } from 'react-dom/client';
import App from './src/app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './src/app/store';
import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
