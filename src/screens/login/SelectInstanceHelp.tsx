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
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {Button} from 'native-base';
class SelectInstanceHelp extends React.Component<SelectInstancePropsHelp> {
  onPressClose = () => {
    this.props.navigation.dispatch(StackActions.pop());
  };

  onPressLearnMore = () => {
    const url =
      'https://opensourcehelp.orangehrm.com/hc/en-us/articles/360020060020-How-to-Configure-URL-and-Login-to-the-app';
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        if (url !== undefined) {
          Linking.openURL(url);
        }
      }
    });
  };

  render() {
    const {theme} = this.props;
    const borderPadding = theme.spacing * 6;
    return (
      <MainLayout statusBarBackgroundColor={theme.palette.statusBar}>
        <View style={{paddingTop: borderPadding}}>
          <View
            style={[styles.closeIconView, {paddingHorizontal: borderPadding}]}>
            <TouchableWithoutFeedback onPress={this.onPressClose}>
              <Icon
                name={'close'}
                style={[
                  styles.closeIconStyle,
                  {
                    paddingVertical: theme.spacing * 4,
                    paddingLeft: theme.spacing * 4,
                  },
                ]}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={[styles.headerView, {paddingBottom: theme.spacing * 8}]}>
            <View
              style={{
                backgroundColor: theme.palette.secondary,
                width: theme.spacing * 3,
                borderBottomRightRadius: theme.borderRadius,
                borderTopRightRadius: theme.borderRadius,
              }}
            />
            <Text
              style={[
                styles.bold,
                {
                  fontSize: theme.typography.headerFontSize,
                  paddingLeft: theme.spacing * 3,
                  paddingRight: borderPadding,
                  color: theme.palette.secondary,
                },
              ]}>
              {'Having trouble accessing your OrangeHRM system?'}
            </Text>
          </View>

          <View style={{paddingHorizontal: borderPadding}}>
            <View style={[styles.row, {paddingBottom: theme.spacing * 5}]}>
              <View style={styles.textView}>
                <Text>
                  {
                    'Enter your OrangeHRM System URL to access your mobile login,'
                  }
                </Text>
              </View>
            </View>
            <View style={[styles.row, {paddingBottom: theme.spacing * 5}]}>
              <View style={styles.textView}>
                <Text>
                  {
                    'Contact your system administrator or click on "Learn More" if you are not sure of your OrangeHRM URL'
                  }
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.learnMoreContainer,
                {
                  marginBottom: theme.spacing * 5,
                },
              ]}>
              <Button
                onPress={this.onPressLearnMore}
                style={{
                  backgroundColor: theme.palette.secondary,
                  paddingHorizontal: theme.spacing * 4,
                  height: theme.spacing * 8,
                  borderRadius: theme.borderRadius * 4,
                }}>
                <Text
                  style={{
                    color: theme.palette.background,
                    fontSize: theme.typography.fontSize,
                  }}>
                  {'Learn More'}
                </Text>
              </Button>
            </View>
            <View style={[styles.row, {paddingBottom: theme.spacing * 5}]}>
              <View style={styles.textView}>
                <Text>
                  {
                    'The mobile application is only supported with OrangeHRM Open Source Web Version 4.5 Onwards.'
                  }
                </Text>
              </View>
            </View>
            <View style={[styles.row, {paddingBottom: theme.spacing * 4}]}>
              <View style={styles.textView}>
                <Text>
                  {'Please contact OrangeHRM support via; '}
                  <Text style={{color: theme.palette.secondary}}>
                    {'ossupport@orangehrm.com'}
                  </Text>
                  {' if you require further assistance'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </MainLayout>
    );
  }
}

interface SelectInstancePropsHelp extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

const styles = StyleSheet.create({
  textView: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
  },
  closeIconStyle: {
    marginLeft: 0,
    marginRight: 0,
  },
  closeIconView: {
    flexDirection: 'row-reverse',
  },
  headerView: {
    flexDirection: 'row',
  },
  learnMoreContainer: {
    alignItems: 'flex-start',
  },
});

export default withTheme<SelectInstancePropsHelp>()(SelectInstanceHelp);
