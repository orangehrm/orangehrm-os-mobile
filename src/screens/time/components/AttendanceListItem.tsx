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
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import Text from 'components/DefaultText';
import Avatar from 'components/DefaultAvatar';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {SingleEmployeeAttendance} from 'store/time/my-attendance/types';

class AttendanceListItem extends React.Component<AttendanceListItemProps> {
  render() {
    const {theme, employeeAttendance, onPress} = this.props;
    return (
      <>
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[
              styles.row,
              {
                padding: theme.spacing * 3,
              },
            ]}>
            <View
              style={{
                paddingRight: theme.spacing * 4,
              }}>
              <Avatar name={employeeAttendance.employeeName} />
            </View>
            <View style={styles.contentView}>
              <View style={{paddingHorizontal: theme.spacing * 2}}>
                <Text
                  style={[
                    styles.empNameText,
                    {
                      color: theme.typography.darkColor,
                      fontSize: theme.typography.fontSize * 1.2,
                    },
                  ]}>
                  {employeeAttendance.employeeName}
                </Text>
              </View>
              <View style={{paddingHorizontal: theme.spacing * 2}}>
                <Text
                  style={{
                    color: theme.palette.secondary,
                    paddingTop: theme.spacing,
                  }}>
                  {employeeAttendance.duration}
                  {' Hours'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

interface AttendanceListItemProps
  extends WithTheme,
    Pick<TouchableWithoutFeedbackProps, 'onPress'> {
  employeeAttendance: SingleEmployeeAttendance;
}

const styles = StyleSheet.create({
  empNameText: {
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  contentView: {
    flex: 1,
  },
});

export default withTheme<AttendanceListItemProps>()(AttendanceListItem);
