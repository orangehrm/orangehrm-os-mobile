import React from 'react';
import {Text, TextProps} from 'react-native';

function DefaultText(props: React.PropsWithChildren<DefaultTextProps>) {
  const {children, ...restProps} = props;
  return <Text {...restProps}>{children}</Text>;
}

interface DefaultTextProps extends TextProps {}

export default DefaultText;
