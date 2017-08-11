/**
 * @providesModule app/redux/store
 */

import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from 'app/redux/reducers';
import { autoRehydrate } from 'redux-persist-immutable';
import Immutable from 'immutable';

const middleWares = [thunk];

if (__DEV__) {
  const { createLogger } = require('redux-logger'); // eslint-disable-line global-require
  const logger = createLogger();
  middleWares.push(logger);
}

const initialState = Immutable.Map();

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleWares),
    autoRehydrate(),
  ),
);

export default store;
