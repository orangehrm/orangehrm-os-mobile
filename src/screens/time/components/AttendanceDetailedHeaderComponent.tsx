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
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Moment} from 'moment';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {convertDateObjectToStringFormat} from 'lib/helpers/attendance';
import Text from 'components/DefaultText';

class AttendanceDetailedHeaderComponent extends React.Component<AttendanceDetailedHeaderComponentProps> {
  toggle = () => {
    if (this.props.isActive === false) {
      this.props.selectDate(this.props.day);
    }
  };

  render() {
    const {isActive, hours, theme} = this.props;
    return (
      <TouchableOpacity onPress={this.toggle} style={styles.flex}>
        <View style={styles.alignItemsCenter}>
          <View style={{paddingTop: theme.spacing * 2}}>
            <Text
              bold
              style={{
                fontSize: theme.typography.subHeaderFontSize,
                color: isActive
                  ? theme.palette.secondary
                  : theme.typography.primaryColor,
              }}>
              {convertDateObjectToStringFormat(this.props.day, 'ddd')}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: isActive
                ? theme.palette.secondary
                : theme.palette.backgroundSecondary,
              paddingHorizontal: theme.spacing * 2.5,
              paddingVertical: theme.spacing * 2,
              borderRadius: theme.borderRadius * 25,
            }}>
            <Text
              style={[
                {
                  fontSize: theme.typography.subHeaderFontSize,
                  color: isActive
                    ? theme.palette.background
                    : theme.typography.primaryColor,
                },
              ]}>
              {convertDateObjectToStringFormat(this.props.day, 'DD')}
            </Text>
          </View>
          <View style={{paddingBottom: theme.spacing * 2}}>
            <Text
              style={{
                color: isActive
                  ? theme.palette.secondary
                  : theme.typography.primaryColor,
              }}>
              {hours}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  alignItemsCenter: {
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});

interface AttendanceDetailedHeaderComponentProps extends WithTheme {
  isActive: boolean;
  day: Moment;
  selectDate: (day: Moment) => void;
  hours: string;
}

const AttendanceDetailedHeaderWithTheme =
  withTheme<AttendanceDetailedHeaderComponentProps>()(
    AttendanceDetailedHeaderComponent,
  );

export default AttendanceDetailedHeaderWithTheme;
