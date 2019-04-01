import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import initStore from './store/utility/initStore';
import './index.scss';
import * as serviceWorker from './serviceWorker';

const store = initStore();
const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App />  
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
