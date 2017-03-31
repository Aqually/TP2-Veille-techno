import React from 'react';
import ReactDOM from 'react-dom';
import routes from "./routes";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, browserHistory} from "react-router";
import reducers from './reducers';
import promise from "redux-promise";
require("../style/style.css");

//creer le store de Redux
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

//initier React
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
