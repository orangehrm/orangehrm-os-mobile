import React from 'react';
import {Button, ButtonProps} from 'react-native';

function DefaultButton(props: DefaultButtonProps) {
  const {primary, ...restProps} = props;
  let color = '#e0e0e0';
  if (primary) {
    color = '#00ac51';
  }
  return <Button color={color} {...restProps} />;
}

interface DefaultButtonProps extends ButtonProps {
  primary?: boolean;
}

export default DefaultButton;
