import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultCardContent(
  props: React.PropsWithChildren<DefaultCardContentProps>,
) {
  const {children, style, theme} = props;
  return (
    <View
      style={[styles.cardContent, style, {borderRadius: theme.borderRadius}]}>
      {children}
    </View>
  );
}

interface DefaultCardContentProps extends WithTheme {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  cardContent: {
    width: '100%',
  },
});

export default withTheme<DefaultCardContentProps>()(DefaultCardContent);
