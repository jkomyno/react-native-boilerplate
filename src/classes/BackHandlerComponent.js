import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';

export default class BackHandlerComponent extends PureComponent {

  static propTypes = {
    navigation: PropTypes.any.isRequired,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  /*
  componentWillReceiveProps(nextProps) {
    if (!!nextProps.error && nextProps.error != this.props.error) {
      // display toast
    }
  }
  */

  onBackButtonPress = () => {
    this.props.navigation.dispatch({ type: 'Navigation/BACK' });
    return true;
  }
}
