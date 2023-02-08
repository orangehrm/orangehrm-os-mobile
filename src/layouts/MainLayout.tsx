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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  StyleSheet,
  RefreshControlProps,
  ScrollViewProps,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import WarningModule from 'components/WarningModule';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_ROLE_ADMIN} from 'store/auth/types';
import {RootState} from 'store';
import {selectMyInfo} from '../store/auth/selectors';
import {fetchMyInfo} from '../store/auth/actions';
import {connect} from 'react-redux';

const MainLayout = (props: React.PropsWithChildren<MainLayoutProps>) => {
  const {
    theme,
    children,
    refreshing,
    onRefresh,
    footer,
    header,
    scrollViewProps,
    statusBarBackgroundColor,
    myInfo,
  } = props;

  const [isVisible, setModelVisible] = useState(false);
  const [option, setOption] = useState(false);

  useEffect(() => {
    if (myInfo?.user.userRole === USER_ROLE_ADMIN) {
      checkWarningModuleStatus();
    }
  });

  const checkWarningModuleStatus = async () => {
    const options = await AsyncStorage.getItem('WarningRead');
    if (options) {
      setModelVisible(false);
    } else {
      setModelVisible(true);
      setTimeout(() => {
        setOption(true);
      }, 1000);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          statusBarBackgroundColor
            ? statusBarBackgroundColor
            : theme.palette.statusBarSecondary
        }
      />
      <SafeAreaView
        style={[styles.safeArea, {backgroundColor: theme.palette.background}]}>
        {header === undefined ? null : header}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            onRefresh === undefined ? undefined : (
              <RefreshControl
                refreshing={refreshing === undefined ? false : refreshing}
                onRefresh={onRefresh}
              />
            )
          }
          {...scrollViewProps}>
          {children}
        </ScrollView>
        {footer === undefined ? null : footer}
      </SafeAreaView>
      {option ? <WarningModule isVisible={isVisible} /> : undefined}
    </>
  );
};

interface MainLayoutProps
  extends WithTheme,
    Pick<RefreshControlProps, 'onRefresh'> {
  refreshing?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  scrollViewProps?: ScrollViewProps;
  statusBarBackgroundColor?: string;
}

const mapStateToProps = (state: RootState) => ({
  myInfo: selectMyInfo(state),
});

const mapDispatchToProps = {
  fetchMyInfo: fetchMyInfo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default connector(withTheme<MainLayoutProps>()(MainLayout));
