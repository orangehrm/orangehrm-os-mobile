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

import React, {useCallback, Fragment} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  SafeAreaView,
  Linking,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
  DrawerContentOptions,
} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerNavigationState as BaseDrawerNavigationState} from '@react-navigation/routers/lib/typescript/src/DrawerRouter';
import ProfilePicture from 'components/ProfilePicture';
import Footer from 'components/DefaultFooter';
import Divider from 'components/DefaultDivider';
import Icon from 'components/DefaultIcon';
import Text from 'components/DefaultText';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectMyInfoFinished,
  selectMyInfo,
  selectEnabledModules,
} from 'store/auth/selectors';
import {
  fetchMyInfo as fetchMyInfoAction,
  logout as logoutAction,
} from 'store/auth/actions';
import useTheme from 'lib/hook/useTheme';
import {getDrawerItems} from 'services/drawer';
import {SUBHEADER_LEAVE, SUBHEADER_TIME} from 'screens';
import {HELP_REDIRECT_URL} from 'services/endpoints';
import {getFullName} from 'lib/helpers/name';

const DrawerContent = (props: DrawerContentProps & DrawerItemListProps) => {
  const {
    myInfo,
    myInfoFinished,
    fetchMyInfo,
    logout,
    enabledModules,
    ...drawerContentProps
  } = props;
  const theme = useTheme();

  const onRefresh = useCallback(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

  const logoutOnPress = useCallback(() => {
    drawerContentProps.navigation.closeDrawer();
    logout();
  }, [logout, drawerContentProps]);

  let imageSource;
  if (myInfo?.employeePhoto !== undefined && myInfo?.employeePhoto !== null) {
    imageSource = {uri: `data:image/png;base64,${myInfo?.employeePhoto}`};
  }

  const commonProps = {
    activeTintColor: theme.palette.secondary,
    inactiveTintColor: theme.typography.primaryColor,
    activeBackgroundColor: theme.palette.background,
    labelStyle: styles.label,
  };

  const history = [...drawerContentProps.state.history];
  let currentDrawerItem = history.pop();
  if (currentDrawerItem?.type !== 'route') {
    currentDrawerItem = history.pop();
  }

  const onPressHelp = () => {
    const url = HELP_REDIRECT_URL;
    if (url !== undefined) {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          if (url !== undefined) {
            Linking.openURL(url);
          }
        }
      });
    }
  };

  let fullName = '';
  if (myInfo?.employee !== undefined) {
    fullName = getFullName(myInfo?.employee);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfilePicture
        name={fullName}
        jobTitle={myInfo?.employee.jobTitle.title}
        imageSource={imageSource}
      />
      <DrawerContentScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={!myInfoFinished} onRefresh={onRefresh} />
        }>
        <View style={styles.view}>
          <View>
            {getDrawerItems(
              drawerContentProps.state,
              drawerContentProps.descriptors,
              enabledModules,
            ).map((drawerItem) => (
              <Fragment key={drawerItem.key}>
                {drawerItem.subheader ? (
                  <View style={styles.subheader}>
                    <Icon
                      name={drawerItem.subheaderIcon?.name}
                      style={{margin: theme.spacing * 2}}
                    />
                    <Text style={{margin: theme.spacing * 2.5}}>
                      {drawerItem.subheader}
                    </Text>
                  </View>
                ) : null}
                <View style={{marginLeft: theme.spacing * 7}}>
                  <DrawerItem
                    style={{marginVertical: theme.spacing * -1}}
                    label={drawerItem.label}
                    onPress={() => {
                      drawerContentProps.navigation.closeDrawer();
                      drawerContentProps.navigation.dispatch(
                        DrawerActions.jumpTo(drawerItem.name),
                      );
                    }}
                    focused={
                      currentDrawerItem?.type === 'route' &&
                      currentDrawerItem.key === drawerItem.key
                    }
                    {...commonProps}
                  />
                </View>
              </Fragment>
            ))}
          </View>
        </View>
      </DrawerContentScrollView>
      <View>
        <Divider />
        <DrawerItem
          style={styles.drawerItem}
          label={'Help'}
          onPress={onPressHelp}
          icon={() => (
            <Icon name={'help-circle'} style={styles.draweItemIcon} />
          )}
          {...commonProps}
        />
        <Divider />
        <DrawerItem
          style={styles.drawerItem}
          label={'Logout'}
          onPress={logoutOnPress}
          icon={() => <Icon name={'logout'} style={styles.draweItemIcon} />}
          {...commonProps}
        />
        <Divider />
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export type DrawerNavigationState = BaseDrawerNavigationState & {
  routeNames: string[];
  routes: Array<{
    key: string;
    name: string;
    params: {
      subheader: typeof SUBHEADER_LEAVE | typeof SUBHEADER_TIME;
      [key: string]: any;
    };
  }>;
};

type DrawerItemListProps = Omit<
  DrawerContentOptions,
  'contentContainerStyle' | 'style'
> & {
  state: DrawerNavigationState;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

interface DrawerContentProps extends ConnectedProps<typeof connector> {}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  subheader: {
    flexDirection: 'row',
  },
  contentContainer: {
    flexGrow: 1,
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  safeArea: {
    flex: 1,
  },

  drawerItem: {
    marginLeft: 0,
  },
  draweItemIcon: {
    marginRight: -14,
  },
});

const mapStateToProps = (state: RootState) => ({
  myInfoFinished: selectMyInfoFinished(state),
  myInfo: selectMyInfo(state),
  enabledModules: selectEnabledModules(state),
});

const mapDispatchToProps = {
  fetchMyInfo: fetchMyInfoAction,
  logout: logoutAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(DrawerContent);
