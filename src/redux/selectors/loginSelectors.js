import { createSelector } from 'reselect';

// selectors

const getTokenValue = state =>
  state.getIn(['login', 'data', 'token']);

const getLoadingMap = state =>
  state.getIn(['login', 'loading']);

const getDataMap = state =>
  state.getIn(['login', 'data']);

const getErrorMap = state =>
  state.getIn(['login', 'error']);

// reselect fuctions

export const getToken = createSelector(
  getTokenValue,
  token => token,
);

export const getLoginReducer = createSelector(
  getLoadingMap,
  getDataMap,
  getErrorMap,
  (loading, data, error) => ({
    loading, data, error,
  }),
);
