import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    borderWidth: 1,
    marginVertical: 2,
    borderRadius: 5,
  },
  normal: {
    backgroundColor: '#FFF',
    borderColor: '#bdc1cc',
    borderStyle: 'solid',
  },
  disabled: {
    opacity: 0.2,
  },
  valid: {
    borderColor: '#66bd2b',
    borderStyle: 'solid',
  },
  error: {
    borderColor: '#e03126',
    borderStyle: 'solid',
  },
  input: {
    borderColor: 'transparent',
    paddingLeft: 36,
    paddingRight: 12,
    color: '#444',
    fontSize: 16,
  },
  icon: {
    top: 12,
    left: 12,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

const iconStates = {
  valid: 'md-checkmark',
  error: 'md-close',
};

const colorStates = {
  normal: '#bdc1cc',
  valid: '#66bd2b',
  error: '#e03126',
};

const Input = (props) => {
  const { width } = props;
  const height = props.height;
  const statusStyle = styles[props.status];
  const icon = props.icon || iconStates[props.status];
  const statusColor = colorStates[props.status];

  let IconComponent;
  if (icon !== '') {
    IconComponent = (
      <Icon
        name={icon}
        size={20}
        color={statusColor}
        style={[styles.icon]}
      />
    );
  }

  // NOTE: Clone props and then delete Component specific props so we can
  // spread the rest
  const { ...rest } = props;
  delete rest.editable;
  delete rest.inputStyle;
  delete rest.style;
  delete rest.disabled;
  delete rest.status;
  delete rest.icon;
  delete rest.height;
  delete rest.width;

  return (
    <View
      style={[
        styles.base,
        statusStyle,
        props.style,
        { width, height },
        props.disabled ? styles.disabled : {},
      ]}
    >
      {IconComponent}
      <TextInput
        {...rest}
        editable={!props.disabled}
        style={[
          styles.base,
          styles.input,
          props.inputStyle,
          { width, height },
        ]}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  status: PropTypes.oneOf(['normal', 'valid', 'error', 'warn']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  icon: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  disabled: false,
  status: 'normal',
  height: 46,
  style: {},
  inputStyle: {},
  icon: '',
  width: '100%',
};

export default Input;
