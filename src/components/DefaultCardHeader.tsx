import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultCardHeader(
  props: React.PropsWithChildren<DefaultCardHeaderProps>,
) {
  const {children, style, theme} = props;
  const headerStyle: StyleProp<ViewStyle> = [styles.cardHeader];
  if (style) {
    headerStyle.push(style);
  }
  return (
    <View
      style={[
        styles.cardHeader,
        style,
        {
          borderTopLeftRadius: theme.borderRadius,
          borderTopRightRadius: theme.borderRadius,
        },
      ]}>
      {children}
    </View>
  );
}

interface DefaultCardHeaderProps extends WithTheme {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  cardHeader: {
    elevation: 1,
    width: '100%',
  },
});

export default withTheme<DefaultCardHeaderProps>()(DefaultCardHeader);
