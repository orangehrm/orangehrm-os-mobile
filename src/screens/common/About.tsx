/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import Text from 'components/DefaultText';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {LICENSES, TITLE_LICENSES} from 'screens';
import {version} from '../../../package.json';
import {displayName} from '../../../app.json';

class About extends React.Component<AboutProps> {
  onPressLicenses = () => {
    this.props.navigation.navigate(LICENSES);
  };

  render() {
    const {theme} = this.props;
    return (
      <MainLayout>
        <View
          style={[
            styles.container,
            {
              paddingHorizontal: theme.spacing * 5,
              paddingTop: theme.spacing * 8,
              paddingBottom: theme.spacing * 6,
            },
          ]}>
          <Image
            source={require('images/app-icon.png')}
            style={[styles.logo, {marginBottom: theme.spacing * 4}]}
            resizeMode={'contain'}
            accessible={false}
            importantForAccessibility={'no'}
          />

          <Text
            style={[
              styles.bold,
              {
                fontSize: theme.typography.subHeaderFontSize,
                color: theme.typography.darkColor,
                marginTop: theme.spacing * 3,
              },
            ]}>
            {displayName}
          </Text>

          <Text
            style={{
              fontSize: theme.typography.fontSize,
              color: theme.typography.primaryColor,
              marginTop: theme.spacing * 3,
            }}>
            {'Version '}
            {version}
          </Text>

          <Text
            style={[
              styles.center,
              {
                fontSize: theme.typography.tinyFontSize,
                color: theme.typography.primaryColor,
                marginTop: theme.spacing * 4,
              },
            ]}>
            {'© 2005 - '}
            {new Date().getFullYear()}
            {' OrangeHRM, Inc.'}
          </Text>
          <Text
            style={[
              styles.center,
              {
                fontSize: theme.typography.tinyFontSize,
                color: theme.typography.primaryColor,
                marginTop: theme.spacing,
              },
            ]}>
            {'All Rights Reserved.'}
          </Text>

          <TouchableOpacity onPress={this.onPressLicenses}>
            <Text
              style={{
                fontSize: theme.typography.fontSize,
                color: theme.palette.secondary,
                marginTop: theme.spacing * 5,
              }}>
              {TITLE_LICENSES}
            </Text>
          </TouchableOpacity>
        </View>
      </MainLayout>
    );
  }
}

interface AboutProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 72,
    height: 72,
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default withTheme<AboutProps>()(About);
