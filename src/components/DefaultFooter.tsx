/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
 */
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
