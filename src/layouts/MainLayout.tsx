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
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  HeaderHeightContext,
  HeaderShownContext,
} from '@react-navigation/elements';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
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
    keyboardVerticalOffset: keyboardVerticalOffsetProp,
  } = props;

  const headerHeightFromContext = React.useContext(HeaderHeightContext);
  const headerOffset =
    keyboardVerticalOffsetProp !== undefined
      ? keyboardVerticalOffsetProp
      : headerHeightFromContext ?? 0;

  // Android 15+ (targetSdk 35 onwards) always lays the window out edge to edge, so
  // content starts behind the status bar and the display cutout. RN's SafeAreaView is
  // an iOS-only no-op there. React Navigation's header already consumes the top inset,
  // so only pad it in ourselves on screens rendered with `headerShown: false`.
  const insets = React.useContext(SafeAreaInsetsContext);
  const isHeaderShown = React.useContext(HeaderShownContext);
  const androidTopInset =
    Platform.OS === 'android' && !isHeaderShown ? insets?.top ?? 0 : 0;

  const scrollView = (
    <ScrollView
      style={Platform.OS === 'ios' ? styles.scrollFlex : undefined}
      contentInsetAdjustmentBehavior={
        Platform.OS === 'ios' ? 'never' : 'automatic'
      }
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
  );

  const body = (
    <>
      {header === undefined ? null : header}
      {scrollView}
      {footer === undefined ? null : footer}
    </>
  );

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
        style={[
          styles.safeArea,
          ...(Platform.OS === 'android'
            ? [styles.safeAreaAndroid, {paddingTop: androidTopInset}]
            : []),
          {backgroundColor: theme.palette.background},
        ]}>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.mainContent}
            keyboardVerticalOffset={headerOffset}>
            {body}
          </KeyboardAvoidingView>
        ) : (
          <View style={styles.mainContent}>{body}</View>
        )}
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
  /** iOS: added to KeyboardAvoidingView offset when not inside a header context (e.g. tests). */
  keyboardVerticalOffset?: number;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  safeAreaAndroid: {
    paddingBottom: 50,
  },
  mainContent: {
    flex: 1,
  },
  scrollFlex: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default withTheme<MainLayoutProps>()(MainLayout);
