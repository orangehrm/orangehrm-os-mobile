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
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  StyleSheet,
  RefreshControlProps,
  ScrollViewProps,
  KeyboardAvoidingView,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

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
  } = props;

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
        <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          {header === undefined ? null : header}
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
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
        </KeyboardAvoidingView>
      </SafeAreaView>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 50,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default withTheme<MainLayoutProps>()(MainLayout);
