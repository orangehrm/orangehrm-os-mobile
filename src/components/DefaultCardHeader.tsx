import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

function DefaultCardHeader(
  props: React.PropsWithChildren<DefaultCardHeaderProps>,
) {
  const {children, style} = props;
  const headerStyle: StyleProp<ViewStyle> = [styles.cardHeader];
  if (style) {
    headerStyle.push(style);
  }
  return <View style={headerStyle}>{children}</View>;
}

interface DefaultCardHeaderProps {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  cardHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    elevation: 1,
    width: '100%',
  },
});

export default DefaultCardHeader;
