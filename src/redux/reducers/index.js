/**
 * @providesModule app/redux/reducers
 */

import { combineReducers } from 'redux-immutable';
import { ON_LOGOUT } from 'app/redux/types';

import login from './login';
import nav from './nav';

const appReducer = combineReducers({
  login,
  nav,
});

const rootReducer = (state, action) => {
  if (action.type === ON_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
