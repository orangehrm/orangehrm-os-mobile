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
