import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './pages';
import { Provider } from 'react-redux';
import { store } from './data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode> # STrict mode tempraritly removed for draggable, study importance
  // another option is to downgrade to react 17 https://github.com/atlassian/react-beautiful-dnd/issues/2396
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
);
