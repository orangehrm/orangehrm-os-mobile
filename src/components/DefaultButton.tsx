import React from 'react';
import {Button, Text, NativeBase} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultButton(props: DefaultButtonProps) {
  const {title, primary, secondary, theme, style, ...restProps} = props;
  let color = theme.palette.default;
  if (primary) {
    color = theme.palette.primary;
  } else if (secondary) {
    color = theme.palette.secondary;
  }

  return (
    <Button
      style={[
        style,
        {
          backgroundColor: color,
          borderRadius: theme.borderRadius,
        },
      ]}
      {...restProps}>
      <Text>{title}</Text>
    </Button>
  );
}

interface DefaultButtonProps extends NativeBase.Button, WithTheme {
  title: string;
  primary?: boolean;
  secondary?: boolean;
}

export default withTheme<DefaultButtonProps>()(DefaultButton);
