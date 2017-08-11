import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import { dismissErrors } from 'app/redux/actions';
import {
  getToken,
  getErrorsReducer,
  getLoginReducer,
} from 'app/redux/selectors';
import AppWithNavigationState, { AppBeforeLogin } from './AppNavigator';

class App extends PureComponent {

  static propTypes = {
    errors: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
    loggedIn: PropTypes.bool.isRequired,
    login: PropTypes.shape({
      data: PropTypes.any,
      error: PropTypes.string,
      loading: PropTypes.bool,
    }).isRequired,
    nav: PropTypes.any.isRequired,
    dismissErrors: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.error !== this.props.errors.error &&
        nextProps.errors.error !== null
      ) {
      Snackbar.show({
        title: `Error: ${nextProps.errors.error}`,
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: 'DISMISS',
          color: '#FFF',
          onPress: this.props.dismissErrors,
        },
      });
    }
  }

  componentWillUnmount() {
    this.props.dismissErrors();
  }

  render() {
    const {
      loggedIn,
      ...otherProps
    } = this.props;

    if (loggedIn) {
      return (
        <AppWithNavigationState {...otherProps} />
      );
    }
    return (
      <AppBeforeLogin />
    );
  }
}

const mapStateToProps = state => ({
  errors: getErrorsReducer(state),
  loggedIn: !!getToken(state),
  login: getLoginReducer(state),
  nav: state.get('nav'),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dismissErrors: bindActionCreators(dismissErrors, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
