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
import Chip from 'components/DefaultChip';
import Date from 'components/FormatedDate';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {LeaveRequest} from 'store/leave/leave-usage/types';
import {LEAVE_TYPE_DELETED_YES} from 'store/leave/leave-usage/types';

class MyLeaveListItem extends React.Component<MyLeaveListItemProps> {
  render() {
    const {theme, leaveRequest, onPress} = this.props;
    const leaveTypeColor = leaveRequest.leaveType.color;
    return (
      <>
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={{
              padding: theme.spacing * 3,
              paddingBottom: theme.spacing * 4,
            }}>
            <View style={styles.chipView}>
              <Chip
                style={[
                  {
                    paddingVertical: theme.spacing,
                    paddingHorizontal: theme.spacing * 3,
                    marginVertical: theme.spacing * 2,
                  },
                  leaveTypeColor
                    ? {backgroundColor: leaveTypeColor}
                    : undefined,
                ]}>
                <Text
                  numberOfLines={1}
                  style={[
                    leaveTypeColor
                      ? {color: theme.typography.lightColor}
                      : {color: theme.typography.darkColor},
                  ]}>
                  {leaveRequest.leaveType.type}
                  {leaveRequest.leaveType.deleted === LEAVE_TYPE_DELETED_YES
                    ? ' (Deleted)'
                    : ''}
                </Text>
              </Chip>
            </View>
            <View style={{paddingHorizontal: theme.spacing * 2}}>
              <Text
                style={{
                  color: theme.palette.secondary,
                  paddingBottom: theme.spacing,
                }}>
                <Date nested>{leaveRequest.fromDate}</Date>
                {leaveRequest.fromDate !== leaveRequest.toDate ? (
                  <>
                    {' to '}
                    <Date nested>{leaveRequest.toDate}</Date>
                  </>
                ) : null}
              </Text>
              <Text style={{fontSize: theme.typography.smallFontSize}}>
                {leaveRequest.leaveBreakdown}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

interface MyLeaveListItemProps
  extends WithTheme,
    Pick<TouchableWithoutFeedbackProps, 'onPress'> {
  leaveRequest: LeaveRequest;
}

const styles = StyleSheet.create({
  chipView: {
    alignItems: 'flex-start',
  },
});

export default withTheme<MyLeaveListItemProps>()(MyLeaveListItem);
