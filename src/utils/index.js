/**
 * @providesModule app/utils
 */

import config from 'app/config';

/**
 * Wraps any promise and adds a setTimeout method, after which expiral an error is thrown
 * @param {number} ms
 * @param {Promise} promise
 * @return {Promise}
 */
export const PromiseTimeout = (ms, promise) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);
    promise.then(resolve, reject);
  });

/**
 * Wraps a fetch-like API (whose default is fetch) with PromiseTimeout
 * @param {String} url
 * @param {Object} options
 * @param {number} timeout
 * @param {Promise} fetchPromise
 * @return {Promise}
 */

export const fetchTimeout = (
  url,
  options,
  timeout = config.timeout,
  fetchPromise = fetch,
) =>
  PromiseTimeout(timeout, fetchPromise(url, options));

/**
 * @param {number} status
 */
export const getNetworkError = (status) => {
  if (status === 200) {
    return null;
  }

  console.log(`Response status: ${status}`);
  let err;
  switch (status) {
    case 401:
      err = 'Unauthorized';
      break;
    case 500:
      err = 'Internal Server Error';
      break;
    default:
      err = 'Unexpected';
  }
  return err;
};
