import React from 'react';
import {useWindowDimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {USERNAME} from 'services/storage';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectStorageLoaded,
  selectInstanceUrl,
  selectUsername,
} from 'store/storage/selectors';
import {setItem} from 'store/storage/actions';

import Login from 'screens/login/Login';
import SelectInstance from 'screens/login/SelectInstance';
import {MY_LEAVE_ENTITLEMENT_AND_USAGE, LEAVE_LIST} from 'screens';

import MyLeaveEntitilementsAndUsage from 'screens/leave/MyLeaveEntitilementsAndUsage';
import LeaveList from 'screens/leave/LeaveList';
import DrawerContent from 'layouts/DrawerContent';
import Overlay from 'components/DefaultOverlay';

const Drawer = createDrawerNavigator();

const Navigator = (props: NavigatorProps) => {
  const {storageLoaded, instanceUrl, loggedInUsername} = props;

  let view = null;
  if (storageLoaded.loaded) {
    if (instanceUrl === null) {
      view = <SelectInstance />;
    } else {
      if (loggedInUsername === null) {
        view = <Login />;
      } else {
        // TODO: Move hooks to useEffect
        const dimensions = useWindowDimensions();
        // TODO: Handle large screens
        const isLargeScreen = dimensions.width >= 768;
        view = (
          <Drawer.Navigator
            initialRouteName={MY_LEAVE_ENTITLEMENT_AND_USAGE}
            drawerType={isLargeScreen ? 'permanent' : 'front'}
            overlayColor="transparent"
            drawerContent={(drawerContentProps: any) => (
              <DrawerContent
                {...drawerContentProps}
                logoutOnPress={() => {
                  props.storageSetItem(USERNAME, null);
                }}
              />
            )}>
            <Drawer.Screen
              name={MY_LEAVE_ENTITLEMENT_AND_USAGE}
              component={MyLeaveEntitilementsAndUsage}
              options={{drawerLabel: 'My Leave Entitlements and Usage'}}
            />
            <Drawer.Screen
              name={LEAVE_LIST}
              component={LeaveList}
              options={{drawerLabel: 'Leave List'}}
            />
          </Drawer.Navigator>
        );
      }
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
});

const mapDispatchToProps = {
  storageSetItem: setItem,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Navigator);
