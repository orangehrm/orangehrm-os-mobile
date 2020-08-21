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
import {View, StyleSheet} from 'react-native';
import useTheme from 'lib/hook/useTheme';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';

const FullInfoView = (props: FullInfoViewProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          paddingBottom: theme.spacing * 5,
          paddingHorizontal: theme.spacing * 4,
        },
        styles.rootView,
      ]}>
      <View style={styles.contentView}>
        <View style={{paddingVertical: theme.spacing * 2}}>
          <Icon
            name={'info-outline'}
            type={'MaterialIcons'}
            style={{fontSize: theme.typography.largeIconSize}}
          />
        </View>
        <Text style={styles.text}>{props.message}</Text>
      </View>
    </View>
  );
};

interface FullInfoViewProps {
  message: string;
}

const styles = StyleSheet.create({
  rootView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  contentView: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default FullInfoView;
