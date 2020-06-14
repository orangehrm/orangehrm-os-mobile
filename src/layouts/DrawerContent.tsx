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
import {StyleSheet, View} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
  DrawerContentOptions,
} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerNavigationState} from '@react-navigation/routers/lib/typescript/src/DrawerRouter';
import ProfilePicture from 'components/ProfilePicture';
import Footer from 'components/DefaultFooter';
import Divider from 'components/DefaultDivider';
import Icon from 'components/DefaultIcon';

const DrawerContent = (props: DrawerContentProps & DrawerItemListProps) => {
  const {theme, logoutOnPress, ...restProps} = props;
  return (
    <>
      <ProfilePicture name={'Profile Name'} jobTitle={'Job Title'} />
      <DrawerContentScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.view}>
          <View>
            <DrawerItemList
              {...restProps}
              activeTintColor={theme.palette.secondary}
              activeBackgroundColor={theme.palette.background}
              labelStyle={styles.label}
            />
          </View>
          <View>
            <Divider />
            <DrawerItem
              label={'Logout'}
              onPress={logoutOnPress}
              icon={() => <Icon name={'logout'} />}
              activeTintColor={theme.palette.secondary}
              activeBackgroundColor={theme.palette.background}
              labelStyle={styles.label}
            />
            <Divider />
            <Footer />
          </View>
        </View>
      </DrawerContentScrollView>
    </>
  );
};

type DrawerItemListProps = Omit<
  DrawerContentOptions,
  'contentContainerStyle' | 'style'
> & {
  state: DrawerNavigationState;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

interface DrawerContentProps extends WithTheme {
  logoutOnPress: () => void;
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flexGrow: 1,
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default withTheme<DrawerContentProps & DrawerItemListProps>()(
  DrawerContent,
);
