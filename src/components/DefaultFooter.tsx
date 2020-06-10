import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'components/DefaultText';
import {version} from '../../package.json';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultFooter(props: DefaultFooterProps) {
  const {theme} = props;
  let {fontSize} = props;
  if (!fontSize) {
    fontSize = 8;
  }

  return (
    <View
      style={[
        styles.footerContainer,
        {paddingTop: theme.spacing * 2, paddingBottom: theme.spacing * 2},
      ]}>
      <Text style={{fontSize, color: theme.typography.primaryColor}}>
        OrangeHRM {version}
      </Text>
      <Text style={{fontSize, color: theme.typography.primaryColor}}>
        © 2005 - {new Date().getFullYear()} {'OrangeHRM, Inc. '}
        {'All Rights Reserved'}.
      </Text>
    </View>
  );
}

interface DefaultFooterProps extends WithTheme {
  fontSize?: number;
}

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme<DefaultFooterProps>()(DefaultFooter);
