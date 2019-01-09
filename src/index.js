import React from 'react';
import { render } from 'react-dom';
import store from './store'
import Root from './components/Root'
import './index.css';

import * as serviceWorker from './serviceWorker';

render(<Root store={store} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
