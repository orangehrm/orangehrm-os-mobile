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
import {View, StyleSheet, ImageSourcePropType} from 'react-native';
import {Thumbnail, NativeBase} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {getNameLetters} from 'lib/helpers/name';
import Text from 'components/DefaultText';

const DefaultAvatar = (props: DefaultAvatarProps) => {
  const {theme, name, imageSource, ...thumbnailProps} = props;
  let size = 56;
  if (thumbnailProps.large) {
    size = 80;
  } else if (thumbnailProps.small) {
    size = 36;
  }

  return (
    <>
      {name && getNameLetters(name) ? (
        <View
          style={[
            styles.overflow,
            {
              backgroundColor: theme.palette.default,
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}>
          <View style={styles.nameAvatarView}>
            <Text
              style={{
                fontSize: theme.typography.headerFontSize * (size / 48),
                color: theme.typography.lightColor,
              }}>
              {getNameLetters(name)}
            </Text>
          </View>
        </View>
      ) : (
        <Thumbnail
          source={
            imageSource ? imageSource : require('images/default-photo.png')
          }
          {...thumbnailProps}
        />
      )}
    </>
  );
};

interface DefaultAvatarProps
  extends WithTheme,
    Omit<NativeBase.Thumbnail, 'source'> {
  name?: string;
  imageSource?: ImageSourcePropType;
}

const styles = StyleSheet.create({
  overflow: {
    overflow: 'hidden',
  },
  nameAvatarView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default withTheme<DefaultAvatarProps>()(DefaultAvatar);
