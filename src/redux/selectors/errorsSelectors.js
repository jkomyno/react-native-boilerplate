import { createSelector } from 'reselect';

// selectors
const getErrorMap = state =>
  state.getIn(['errors', 'error']);

export const getErrorsReducer = createSelector(
  getErrorMap,
  error => ({ error }),
);
