import React, { PureComponent } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import images from 'app/images';

const logoSize = Dimensions.get('window').width * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});

export default class Splash extends PureComponent {
  state = {
    opacity: new Animated.Value(0.25),
  }

  componentDidMount() {
    const { opacity } = this.state;

    const animation = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.75,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);
    Animated.loop(animation).start();
  }

  render() {
    const { opacity } = this.state;
    return (
      <View style={styles.container}>
        <Animated.Image
          resizeMode="contain"
          style={{
            width: logoSize,
            height: logoSize,
            opacity,
          }}
          source={images.splash}
        />
      </View>
    );
  }
}
