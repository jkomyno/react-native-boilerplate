import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from 'react-native-platform-touchable';

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  button: {
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class SubmitButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    loading: false,
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(this.props.disabled | 0);
    this.pulse = new Animated.ValueXY({
      x: 1,
      y: 1,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      this.animateButtonBackground(nextProps);
    }
    if (nextProps.loading) {
      this.animateButtonPulse();
    } else {
      this.pulse.stopAnimation();
      this.normalizeButtonPulse();
    }
  }

  animateButtonBackground = ({ disabled }) => {
    Animated.timing(this.animatedValue, {
      toValue: disabled | 0,
      duration: 500,
    })
      .start();
  }

  animateButtonPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.pulse, {
          toValue: {
            x: 0,
            y: 0,
          },
          duration: 500,
        }),
        Animated.timing(this.pulse, {
          toValue: {
            x: 1,
            y: 1,
          },
          duration: 500,
        }),
      ]),
    ).start();
  }

  normalizeButtonPulse = () => {
    Animated.spring(this.pulse, {
      toValue: {
        x: 1,
        y: 1,
      },
      bounciness: 0.9,
      speed: 0.5,
    }).start();
  }

  render() {
    const {
      onPress,
      disabled,
    } = this.props;

    const backgroundColorInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(101, 152, 212, 1)', 'rgba(222, 224, 226, 1)'],
    });

    return (
      <View style={styles.buttonContainer}>
        <Animated.View
          style={[
            styles.button,
            { backgroundColor: backgroundColorInterpolate },
            {
              transform: [
                { scale: this.pulse.x },
              ],
              opacity: this.pulse.y,
            },
          ]}
        >
          <Touchable
            background={Touchable.SelectableBackgroundBorderless()}
            onPress={onPress}
            disabled={disabled}
          >
            <Icon
              size={50}
              name="ios-arrow-dropright"
              color="#FFF"
            />
          </Touchable>
        </Animated.View>
      </View>
    );
  }
}
