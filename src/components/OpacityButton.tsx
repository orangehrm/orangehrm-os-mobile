import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

function DefaultButton(props: DefaultButtonProps) {
  const {title, style, ...restProps} = props;
  const buttonStyle: StyleProp<ViewStyle> = [styles.button];
  if (props.primary) {
    buttonStyle.push(styles.buttonPrimary);
  } else {
    buttonStyle.push(styles.buttonDefault);
  }
  buttonStyle.push(style);

  return (
    <TouchableOpacity style={buttonStyle} {...restProps}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

interface DefaultButtonProps extends TouchableOpacityProps {
  title: string;
  primary?: boolean;
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 8,
  },
  buttonDefault: {
    backgroundColor: '#e0e0e0',
  },
  buttonPrimary: {
    backgroundColor: '#00ac51',
  },
});

export default DefaultButton;
