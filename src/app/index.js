/**
 * @providesModule app/root
 */

import React, { PureComponent } from 'react';
import {
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { persistStore } from 'redux-persist-immutable';
import { Provider } from 'react-redux';
import store from 'app/redux/store';
import { spashTimeout } from 'app/config';
import colors from 'app/colors';
import { Splash } from 'app/screens';
import App from './App';

console.disableYellowBox = true; // eslint-disable-line no-console

export default class Root extends PureComponent {
  state = {
    rehydrated: false,
    timeout: false,
  };

  componentWillMount() {
    // Delay Render Until Rehydration Complete
    persistStore(store, {
      storage: AsyncStorage,
      blacklist: [
        'nav',
      ],
    }, () => {
      this.setState({
        rehydrated: true,
      });
    });

    setTimeout(() => {
      this.setState({
        timeout: true,
      });
    }, spashTimeout);
  }

  render() {
    const {
      rehydrated,
      timeout,
    } = this.state;

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={colors.statusBar}
            barStyle="light-content"
            animated
          />
          {
            (rehydrated && timeout) ?
              <App /> :
              <Splash />
          }
        </View>
      </Provider>
    );
  }
}
