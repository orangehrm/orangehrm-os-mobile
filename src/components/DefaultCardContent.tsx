import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

function DefaultCardContent(
  props: React.PropsWithChildren<DefaultCardContentProps>,
) {
  const {children, style} = props;
  const contentStyle: StyleProp<ViewStyle> = [styles.cardContent];
  if (style) {
    contentStyle.push(style);
  }
  return <View style={contentStyle}>{children}</View>;
}

interface DefaultCardContentProps {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  cardContent: {
    borderRadius: 8,
    width: '100%',
  },
});

export default DefaultCardContent;
