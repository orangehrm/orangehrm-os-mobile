import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'components/DefaultText';
import {version} from '../../package.json';

function DefaultFooter(props: DefaultFooterProps) {
  let {fontSize} = props;
  if (!fontSize) {
    fontSize = 8;
  }
  const textStyles = StyleSheet.create({
    text: {
      fontSize,
    },
  });
  return (
    <View style={styles.footerContainer}>
      <Text style={textStyles.text}>OrangeHRM {version}</Text>
      <Text style={textStyles.text}>
        © 2005 - {new Date().getFullYear()} {'OrangeHRM, Inc. '}
        {'All Rights Reserved'}.
      </Text>
    </View>
  );
}

interface DefaultFooterProps {
  fontSize?: number;
}

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default DefaultFooter;
