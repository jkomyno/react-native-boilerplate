/**
 * @providesModule app/navigator
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Home,
  Login,
} from 'app/screens';

const routesConfig = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({ focused /* tintColor */ }) => ( // eslint-disable-line react/prop-types
        <Icon
          name="md-home"
          size={26}
          color={focused ? 'white' : 'grey'}
        />
      ),
    },
  },
};

const tabNavigatorConfig = {
  initialRouteName: 'Home',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: 'red', // label and icon color of the active tab
    inactiveTintColor: 'yellow', // label and icon color of the inactive tab
    showIcon: true,
    showLabel: true, // whether to show label for tab
    style: {
      backgroundColor: 'orange',
    },
  },
};

export const AppNavigator = TabNavigator(routesConfig, tabNavigatorConfig);

export const AppBeforeLogin = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

export default class AppWithNavigationState extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const {
      nav: state,
      ...otherProps
    } = this.props;

    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          state,
          ...otherProps,
        })}
      />
    );
  }
}
