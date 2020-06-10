import React from 'react';
import {Text, TextProps} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultText(props: React.PropsWithChildren<DefaultTextProps>) {
  const {children, style, theme, ...restProps} = props;
  return (
    <Text
      style={[{color: theme.typography.primaryColor}, style]}
      {...restProps}>
      {children}
    </Text>
  );
}

interface DefaultTextProps extends TextProps, WithTheme {}

export default withTheme<DefaultTextProps>()(DefaultText);
