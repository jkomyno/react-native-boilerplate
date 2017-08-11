import { Map } from 'immutable';
import {
  ON_LOGOUT,
  ON_LOGIN_WAITING,
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAILURE,
} from 'app/redux/types';

const initialState = Map({
  loading: false,
  data: Map(),
  error: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGOUT:
      return state.mergeDeep({
        data: Map({
          token: null,
        }),
      });
    case ON_LOGIN_WAITING:
      return state.set('loading', true);
    case ON_LOGIN_SUCCESS:
      return state.mergeDeep({
        loading: false,
        data: Map(action.data),
        error: null,
      });
    case ON_LOGIN_FAILURE:
      return state.mergeDeep({
        loading: false,
        data: Map(),
        error: action.error,
      });
    default:
      return state;
  }
};
