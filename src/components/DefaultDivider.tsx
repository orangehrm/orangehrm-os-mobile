import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

const DefaultDivider = (props: DefaultDividerProps) => {
  const {theme, style, ...restProps} = props;
  return (
    <View
      style={[
        styles.divider,
        {backgroundColor: theme.typography.primaryColor},
        style,
      ]}
      {...restProps}
    />
  );
};

interface DefaultDividerProps extends WithTheme, ViewProps {}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});

export default withTheme<DefaultDividerProps>()(DefaultDivider);
