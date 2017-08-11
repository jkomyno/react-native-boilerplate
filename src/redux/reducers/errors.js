import { Map } from 'immutable';
import { DISMISS_ERRORS } from 'app/redux/types';

const initialState = Map({
  error: null,
});

export default (state = initialState, action) => {
  if (/FAILURE$/.test(action.type)) {
    return state.merge({
      error: action.error,
    });
  } else if (action.type === DISMISS_ERRORS || action.type === 'Navigation/NAVIGATE') {
    return state.merge(initialState);
  }
  return state;
};
