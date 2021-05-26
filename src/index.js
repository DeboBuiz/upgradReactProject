import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

ReactDOM.render(<Controller />, document.getElementById('root'));
registerServiceWorker();
