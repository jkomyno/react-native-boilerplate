/**
 * @providesModule app/config
 */

import { Platform } from 'react-native';

export default {
  baseUrl: 'http://192.168.252.111:3000/',
  timeout: 12000, // ms
  spashTimeout: 750, // ms
  IS_ANDROID: Platform.OS === 'android',
};
