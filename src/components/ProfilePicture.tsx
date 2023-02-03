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
  View,
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {Thumbnail} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';

const ProfilePicture = (props: ProfilePictureProps) => {
  const {theme, imageSource, name, jobTitle} = props;
  return (
    <View>
      <ImageBackground
        source={imageSource ? imageSource : require('images/default-photo.png')}
        style={styles.backgroundImageWidth}
        imageStyle={styles.backgroundImage}>
        <View>
          <View style={styles.thumbnailContainer}>
            <Thumbnail
              large
              source={
                imageSource ? imageSource : require('images/default-photo.png')
              }
              style={{margin: theme.spacing * 4}}
            />
          </View>
          <View
            style={{
              marginLeft: theme.spacing * 4,
              marginBottom: theme.spacing * 4,
            }}>
            {name === undefined ? null : (
              <Text
                style={[styles.nameText, {color: theme.typography.darkColor}]}>
                {name}
              </Text>
            )}
            {jobTitle === undefined || jobTitle === null ? null : (
              <Text style={{color: theme.typography.darkColor}}>
                {jobTitle}
              </Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

interface ProfilePictureProps extends WithTheme {
  imageSource?: ImageSourcePropType;
  name?: string;
  jobTitle?: string | null;
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.5,
  },
  backgroundImageWidth: {},
  thumbnailContainer: {
    elevation: 4,
  },
  nameText: {
    fontWeight: 'bold',
  },
});

export default withTheme<ProfilePictureProps>()(ProfilePicture);
