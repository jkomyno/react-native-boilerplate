import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { startLogin } from 'app/redux/actions';
import {
  getErrorsReducer,
  getLoginReducer,
} from 'app/redux/selectors';
import {
  Container,
  TextInput,
} from 'app/components/shared';
import { SubmitButton } from 'app/components/login';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    padding: 25,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  cardBottom: {
    width: '100%',
    height: 4,
    elevation: 2,
    backgroundColor: '#62F7AD',
  },
  label: {
    color: '#5982EA',
    fontSize: 14,
    fontWeight: '400',
    paddingTop: 5,
  },
});

class Login extends PureComponent {

  static propTypes = {
    startLogin: PropTypes.func.isRequired,
    errors: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  };

  state = {
    username: '',
    password: '',
    disabled: true,
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps@Login', nextProps);
  }

  onSubmit = () => {
    console.log('onSubmit');
    const {
      username,
      password,
    } = this.state;
    this.props.startLogin({
      username,
      password,
    });
  }

  onChangeEmail = (username) => {
    this.setState(({ password }) => ({
      username,
      disabled: !username || !password,
    }));
  };

  onChangePassword = (password) => {
    this.setState(({ username }) => ({
      password,
      disabled: !password || !username,
    }));
  }

  render() {
    const {
      disabled,
      username,
      password,
    } = this.state;
    const { error } = this.props.errors;

    return (
      <Container>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Email address..."
              onChangeText={this.onChangeEmail}
              value={username}
              icon="ios-mail"
              status={error ? 'error' : 'normal'}
              maxLength={36}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry
              placeholder="Password..."
              onChangeText={this.onChangePassword}
              value={password}
              icon="ios-lock"
              status={error ? 'error' : 'normal'}
              maxLength={36}
            />

            <SubmitButton
              onPress={this.onSubmit}
              disabled={disabled}
              loading={this.props.loading}
            />
          </View>
          <View style={styles.cardBottom} />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  errors: getErrorsReducer(state),
  loading: getLoginReducer(state).loading,
});

export default connect(mapStateToProps, { startLogin })(Login);
