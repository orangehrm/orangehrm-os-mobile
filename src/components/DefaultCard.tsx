import React from 'react';
import {View, StyleSheet} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DeafultCard(props: React.PropsWithChildren<DeafultCardProps>) {
  const {children, fullWidth, theme} = props;
  return (
    <View
      style={[
        styles.cardStyle,
        fullWidth ? styles.fullWidth : undefined,
        {
          borderRadius: theme.borderRadius,
          backgroundColor: theme.palette.background,
        },
      ]}>
      {children}
    </View>
  );
}

interface DeafultCardProps extends WithTheme {
  fullWidth?: boolean;
}

const styles = StyleSheet.create({
  cardStyle: {
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 0.5, width: 0},
    elevation: 2,
  },
  fullWidth: {
    width: '100%',
  },
});

export default withTheme<DeafultCardProps>()(DeafultCard);
