import React from 'react';
import ReactDOM from 'react-dom';
import routes from "./routes";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, browserHistory} from "react-router";
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
require("../style/style.css");

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
