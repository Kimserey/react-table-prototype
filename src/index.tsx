import React from 'react';
import ReactDOM from 'react-dom';
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppState } from './AppState';

const store = new AppState();
ReactDOM.render(<App store={store} />, document.getElementById('root'));

serviceWorker.unregister();
