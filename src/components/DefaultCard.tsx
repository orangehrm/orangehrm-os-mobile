import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

function DeafultCard(props: React.PropsWithChildren<DeafultCardProps>) {
  const {children, fullWidth} = props;
  const style: StyleProp<ViewStyle> = [styles.cardStyle];
  if (fullWidth) {
    style.push(styles.fullWidth);
  }
  return <View style={style}>{children}</View>;
}

interface DeafultCardProps {
  fullWidth?: boolean;
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 8,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 0.5, width: 0},
    elevation: 2,
    backgroundColor: 'white',
  },
  fullWidth: {
    width: '100%',
  },
});

export default DeafultCard;
