import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

function DefaultCardActions(
  props: React.PropsWithChildren<DefaultCardActionsProps>,
) {
  const {children, style} = props;
  const actionsStyle: StyleProp<ViewStyle> = [styles.cardActions];
  if (style) {
    actionsStyle.push(style);
  }
  return <View style={actionsStyle}>{children}</View>;
}

interface DefaultCardActionsProps {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  cardActions: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: 8,
    width: '100%',
  },
});

export default DefaultCardActions;
