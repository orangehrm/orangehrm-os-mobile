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

import React, {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectStorageLoaded,
  selectInstanceUrl,
  selectUsername,
} from 'store/storage/selectors';
import {logout} from 'store/auth/actions';
import {fetchMyInfo} from 'store/auth/actions';
import {selectMyInfoSuccess, selectIsCalledMyInfo} from 'store/auth/selectors';

import Login from 'screens/login/Login';
import SelectInstance from 'screens/login/SelectInstance';
import {
  SELECT_INSTANCE,
  LOGIN,
  MY_LEAVE_ENTITLEMENT_AND_USAGE,
  LEAVE_LIST,
  SUBHEADER_LEAVE,
} from 'screens';

import MyLeaveUsage from 'screens/leave/MyLeaveUsageNavigator';
import LeaveList from 'screens/leave/LeaveListNavigator';
import DrawerContent from 'layouts/DrawerContent';
import Overlay from 'components/DefaultOverlay';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = (props: NavigatorProps) => {
  const {
    storageLoaded,
    instanceUrl,
    loggedInUsername,
    myInfoSuccess,
    isCalledMyInfo,
  } = props;
  const dimensions = useWindowDimensions();

  useEffect(() => {
    if (
      instanceUrl !== null &&
      loggedInUsername !== null &&
      !myInfoSuccess &&
      !isCalledMyInfo
    ) {
      props.fetchMyInfo();
    }
  });

  let view = null;
  if (storageLoaded.loaded) {
    if (instanceUrl !== null && loggedInUsername !== null) {
      // TODO: Handle large screens
      const isLargeScreen = dimensions.width >= 768;
      view = (
        <Drawer.Navigator
          initialRouteName={MY_LEAVE_ENTITLEMENT_AND_USAGE}
          openByDefault={false}
          drawerType={isLargeScreen ? 'permanent' : 'front'}
          drawerContent={(drawerContentProps: any) => (
            <DrawerContent
              {...drawerContentProps}
              logoutOnPress={() => {
                drawerContentProps.navigation.closeDrawer();
                props.logout();
              }}
            />
          )}>
          <Drawer.Screen
            name={MY_LEAVE_ENTITLEMENT_AND_USAGE}
            component={MyLeaveUsage}
            options={{drawerLabel: 'My Leave Usage'}}
            initialParams={{subheader: SUBHEADER_LEAVE}}
          />
          <Drawer.Screen
            name={LEAVE_LIST}
            component={LeaveList}
            options={{drawerLabel: 'Leave List'}}
            initialParams={{subheader: SUBHEADER_LEAVE}}
          />
        </Drawer.Navigator>
      );
    } else {
      let initialRouteName = LOGIN;
      if (instanceUrl === null) {
        initialRouteName = SELECT_INSTANCE;
      }

      view = (
        <Stack.Navigator
          headerMode={'none'}
          initialRouteName={initialRouteName}>
          <Stack.Screen name={SELECT_INSTANCE} component={SelectInstance} />
          <Stack.Screen name={LOGIN} component={Login} />
        </Stack.Navigator>
      );
    }
  } else {
    view = <Overlay modalProps={{visible: true}} />;
  }

  return <NavigationContainer>{view}</NavigationContainer>;
};

interface NavigatorProps extends ConnectedProps<typeof connector> {}

const mapStateToProps = (state: RootState) => ({
  storageLoaded: selectStorageLoaded(state),
  instanceUrl: selectInstanceUrl(state),
  loggedInUsername: selectUsername(state),
  myInfoSuccess: selectMyInfoSuccess(state),
  isCalledMyInfo: selectIsCalledMyInfo(state),
});

const mapDispatchToProps = {
  logout: logout,
  fetchMyInfo: fetchMyInfo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Navigator);
