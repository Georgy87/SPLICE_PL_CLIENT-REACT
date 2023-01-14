import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { QUERY_PARAM } from './constans/routing';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter basename={QUERY_PARAM.FIRST_LOAD}>
            <App />
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);

reportWebVitals();
