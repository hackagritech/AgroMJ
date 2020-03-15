import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

toast.configure();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
