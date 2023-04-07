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
import {View, ImageBackground, StyleSheet} from 'react-native';
import {Thumbnail} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import useEmployeePhoto from 'lib/hook/useEmployeePhoto';
import {Employee} from 'store/auth/types';
import {getFullName} from 'lib/helpers/name';

const ProfilePicture = (props: ProfilePictureProps) => {
  const {theme, employee} = props;
  const employeePhoto = useEmployeePhoto(employee?.empNumber);
  let fullName: string | undefined;
  if (employee !== undefined) {
    fullName = getFullName(employee);
  }
  const jobTitle = employee?.jobTitle.title;
  return (
    <View>
      <ImageBackground
        source={employeePhoto.source}
        defaultSource={require('images/default-photo.png')}
        style={styles.backgroundImageWidth}
        imageStyle={styles.backgroundImage}>
        <View>
          <View style={styles.thumbnailContainer}>
            <Thumbnail
              large
              source={employeePhoto.source}
              defaultSource={require('images/default-photo.png')}
              style={{margin: theme.spacing * 4}}
            />
          </View>
          <View
            style={{
              marginLeft: theme.spacing * 4,
              marginBottom: theme.spacing * 4,
            }}>
            {fullName === undefined ? null : (
              <Text
                style={[styles.nameText, {color: theme.typography.darkColor}]}>
                {fullName}
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
  employee: Employee | undefined;
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
