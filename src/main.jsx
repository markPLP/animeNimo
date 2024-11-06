import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './store';
// import { store, persistor } from './store';
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    {/* <PersistGate loading={null} persistor={persistor}></PersistGate> */}
  </Provider>
);
