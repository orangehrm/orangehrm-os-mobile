import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultButton(props: DefaultButtonProps) {
  const {title, primary, style, theme, ...restProps} = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {padding: theme.spacing * 2, backgroundColor: theme.palette.default},
        primary ? {backgroundColor: theme.palette.primary} : undefined,
        style,
      ]}
      {...restProps}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

interface DefaultButtonProps extends TouchableOpacityProps, WithTheme {
  title: string;
  primary?: boolean;
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
});

export default withTheme<DefaultButtonProps>()(DefaultButton);
