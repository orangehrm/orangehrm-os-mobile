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
import {View, StyleSheet, Modal, Platform} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  DrawerActions,
} from '@react-navigation/native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import IconButton from 'components/DefaultIconButton';
import {selectInitialRoute} from 'store/globals/selectors';
import {LeaveRequestSuccessRouteParams} from 'screens/leave/navigators';

class LeaveRequestSuccess extends React.Component<LeaveRequestSuccessProps> {
  onPressHome = () => {
    const {initialRoute, navigation} = this.props;
    navigation.dispatch(StackActions.pop());
    navigation.dispatch(DrawerActions.jumpTo(initialRoute));
  };

  onRequestClose = () => {
    const {navigation} = this.props;
    navigation.dispatch(StackActions.pop());
  };

  render() {
    const {theme} = this.props;
    const mainView = (
      <View
        style={[
          {
            paddingBottom: theme.spacing * 5,
            paddingHorizontal: theme.spacing * 4,
          },
          styles.rootView,
        ]}>
        <View style={styles.contentView}>
          <View style={{paddingVertical: theme.spacing * 6}}>
            <Icon
              name={'check-circle-outline'}
              style={{
                fontSize: theme.typography.largeIconSize,
                color: theme.palette.secondary,
              }}
            />
          </View>
          <Text
            style={{
              color: theme.palette.secondary,
              fontSize: theme.typography.headerFontSize,
              paddingBottom: theme.spacing * 6,
            }}>
            {'Completed'}
          </Text>
          <Text style={styles.text}>
            {'Leave Request Has Been Successfully Submitted.'}
          </Text>
        </View>
        <View>
          <IconButton
            iconProps={{
              name: 'home',
              style: {
                color: theme.typography.secondaryColor,
                fontSize: theme.typography.largeIconSize,
              },
            }}
            buttonProps={{
              onPress: this.onPressHome,
              style: {backgroundColor: theme.palette.primary},
              rounded: true,
              large: true,
            }}
          />
        </View>
      </View>
    );
    return (
      <SafeAreaLayout>
        {Platform.OS === 'ios' ? (
          mainView
        ) : (
          <Modal
            animationType="fade"
            statusBarTranslucent
            visible={true}
            onRequestClose={this.onRequestClose}>
            {mainView}
          </Modal>
        )}
      </SafeAreaLayout>
    );
  }
}

interface LeaveRequestSuccessProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  route: LeaveRequestSuccessRouteParams;
}

const styles = StyleSheet.create({
  rootView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  contentView: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  initialRoute: selectInitialRoute(state),
});

const connector = connect(mapStateToProps);

const LeaveCommentsWithTheme = withTheme<LeaveRequestSuccessProps>()(
  LeaveRequestSuccess,
);

export default connector(LeaveCommentsWithTheme);
