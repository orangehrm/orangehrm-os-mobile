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

import React, {useEffect, useState} from 'react';
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
import {fetchMyInfo} from 'store/auth/actions';
import {
  selectMyInfoSuccess,
  selectIsCalledMyInfo,
  selectMyInfo,
} from 'store/auth/selectors';
import {USER_ROLE_ADMIN} from 'store/auth/types';
import {selectInitialRoute} from 'store/globals/selectors';
import {navigationRef, getNavigation} from 'lib/helpers/navigation';
import useGlobals from 'lib/hook/useGlobals';

import Login from 'screens/login/Login';
import SelectInstance from 'screens/login/SelectInstance';
import {
  SELECT_INSTANCE,
  LOGIN,
  APPLY_LEAVE,
  MY_LEAVE_ENTITLEMENT_AND_USAGE,
  LEAVE_LIST,
  ASSIGN_LEAVE,
  SUBHEADER_LEAVE,
} from 'screens';

import ApplyLeave from 'screens/leave/navigators/ApplyLeaveNavigator';
import MyLeaveUsage from 'screens/leave/navigators/MyLeaveUsageNavigator';
import LeaveList from 'screens/leave/navigators/LeaveListNavigator';
import AssignLeave from 'screens/leave/navigators/AssignLeaveNavigator';
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
    initialRoute,
    myInfo,
  } = props;
  const dimensions = useWindowDimensions();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {changeCurrentRoute} = useGlobals();

  const onRouteChange = () => {
    const currentRoute = getNavigation()?.getCurrentRoute()?.name;
    if (currentRoute) {
      changeCurrentRoute(currentRoute);
    }
  };

  useEffect(() => {
    if (
      instanceUrl !== null &&
      loggedInUsername !== null &&
      !myInfoSuccess &&
      !isCalledMyInfo
    ) {
      props.fetchMyInfo();
    }

    if (getNavigation() !== null && !isSubscribed) {
      getNavigation()?.addListener('state', onRouteChange);
      setIsSubscribed(true);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    instanceUrl,
    loggedInUsername,
    myInfoSuccess,
    isCalledMyInfo,
    isSubscribed,
  ]);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    return () => {
      getNavigation()?.removeListener('state', onRouteChange);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  let view = null;
  if (storageLoaded.loaded) {
    if (instanceUrl !== null && loggedInUsername !== null) {
      // TODO: Handle large screens
      const isLargeScreen = dimensions.width >= 768;
      view = (
        <Drawer.Navigator
          initialRouteName={initialRoute}
          openByDefault={false}
          drawerType={isLargeScreen ? 'permanent' : 'front'}
          drawerContent={(drawerContentProps: any) => (
            <DrawerContent {...drawerContentProps} />
          )}>
          <Drawer.Screen
            name={APPLY_LEAVE}
            component={ApplyLeave}
            options={{drawerLabel: 'Apply Leave'}}
            initialParams={{subheader: SUBHEADER_LEAVE}}
          />
          <Drawer.Screen
            name={MY_LEAVE_ENTITLEMENT_AND_USAGE}
            component={MyLeaveUsage}
            options={{drawerLabel: 'My Leave Usage'}}
            initialParams={{subheader: SUBHEADER_LEAVE}}
          />
          {myInfo?.user.userRole === USER_ROLE_ADMIN ||
          myInfo?.user.isSupervisor === true ? (
            <>
              <Drawer.Screen
                name={LEAVE_LIST}
                component={LeaveList}
                options={{drawerLabel: 'Leave List'}}
                initialParams={{subheader: SUBHEADER_LEAVE}}
              />
              <Drawer.Screen
                name={ASSIGN_LEAVE}
                component={AssignLeave}
                options={{drawerLabel: 'Assign Leave'}}
                initialParams={{subheader: SUBHEADER_LEAVE}}
              />
            </>
          ) : null}
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

  return <NavigationContainer ref={navigationRef}>{view}</NavigationContainer>;
};

interface NavigatorProps extends ConnectedProps<typeof connector> {}

const mapStateToProps = (state: RootState) => ({
  storageLoaded: selectStorageLoaded(state),
  instanceUrl: selectInstanceUrl(state),
  loggedInUsername: selectUsername(state),
  myInfoSuccess: selectMyInfoSuccess(state),
  isCalledMyInfo: selectIsCalledMyInfo(state),
  initialRoute: selectInitialRoute(state),
  myInfo: selectMyInfo(state),
});

const mapDispatchToProps = {
  fetchMyInfo: fetchMyInfo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Navigator);
