/* eslint-disable no-unused-vars */

import {
  ON_LOGOUT,
  ON_LOGIN_WAITING,
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAILURE,
} from 'app/redux/types';
import { baseUrl } from 'app/config';
import {
  getNetworkError,
  fetchTimeout,
} from 'app/utils';

export const onLogout = () => ({
  type: ON_LOGOUT,
});

const onLoginWaiting = () => ({
  type: ON_LOGIN_WAITING,
});

const onLoginSuccess = data => ({
  type: ON_LOGIN_SUCCESS,
  data,
});

const onLoginFailure = error => ({
  type: ON_LOGIN_FAILURE,
  error,
});

export const startLogin = params =>
  async (dispatch) => {
    dispatch(onLoginWaiting());
    const json = {
      token: '123abc',
    };
    dispatch(onLoginSuccess(json));
    /*
    const url = `${baseUrl}/logIn`;

    try {
      const response = await fetchTimeout(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const err = getNetworkError(response.status);

      if (err) {
        throw new Error(err);
      }

      const json = await response.json();

      dispatch(onLoginSuccess(json));
    } catch ({ message }) {
      dispatch(onLoginFailure(message));
    }
    */
  };
