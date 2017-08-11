import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ViewPropTypes,
} from 'react-native';

const containerStyle = {
  flex: 1,
  padding: 10,
  backgroundColor: '#f6f8f9',
};

const Container = ({ children, style }) => (
  <View style={[containerStyle, style]}>
    {children}
  </View>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
};

Container.defaultProps = {
  style: {},
};

export default Container;
