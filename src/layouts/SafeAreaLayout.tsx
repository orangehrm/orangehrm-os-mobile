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
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {Root} from 'native-base';

const SafeAreaLayout = (
  props: React.PropsWithChildren<SafeAreaLayoutProps>,
) => {
  const {theme, children} = props;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.palette.statusBarSecondary}
      />
      <SafeAreaView
        style={[styles.safeArea, {backgroundColor: theme.palette.background}]}>
        <Root>
          <KeyboardAvoidingView style={styles.root}>
            {children}
          </KeyboardAvoidingView>
        </Root>
      </SafeAreaView>
    </>
  );
};

interface SafeAreaLayoutProps extends WithTheme {}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
});

export default withTheme<SafeAreaLayoutProps>()(SafeAreaLayout);
