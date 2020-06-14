/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
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
              <Text style={styles.nameText}>{name}</Text>
            )}
            {jobTitle === undefined ? null : <Text>{jobTitle}</Text>}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

interface ProfilePictureProps extends WithTheme {
  imageSource?: ImageSourcePropType;
  name?: string;
  jobTitle?: string;
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
