import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultCardActions(
  props: React.PropsWithChildren<DefaultCardActionsProps>,
) {
  const {children, style, theme} = props;
  const actionsStyle: StyleProp<ViewStyle> = [styles.cardActions];
  if (style) {
    actionsStyle.push(style);
  }
  return (
    <View
      style={[
        styles.cardActions,
        style,
        {
          borderBottomLeftRadius: theme.borderRadius,
          borderBottomRightRadius: theme.borderRadius,
          paddingBottom: theme.spacing * 2,
        },
      ]}>
      {children}
    </View>
  );
}

interface DefaultCardActionsProps extends WithTheme {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  cardActions: {
    width: '100%',
  },
});

export default withTheme<DefaultCardActionsProps>()(DefaultCardActions);
