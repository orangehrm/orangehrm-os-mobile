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
import Text from 'components/DefaultText';
import Date from 'components/FormatedDate';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {Leave} from 'store/leave/leave-usage/types';
import {LEAVE_STATUS_MAP} from 'lib/helpers/leave';

class LeaveDayListItem extends React.Component<LeaveDayListItemProps> {
  render() {
    const {theme, leave} = this.props;
    return (
      <>
        <View
          style={[
            styles.row,
            {
              paddingHorizontal: theme.spacing * 4,
              paddingVertical: theme.spacing * 3,
            },
          ]}>
          <View
            style={{
              paddingVertical: theme.spacing,
              paddingRight: theme.spacing * 4,
            }}>
            <Date>{leave.date}</Date>
          </View>
          <View style={styles.flex}>
            <Text style={[styles.statusText]}>
              {LEAVE_STATUS_MAP[leave.status]}
            </Text>
            <Text style={[{fontSize: theme.typography.smallFontSize}]}>
              {leave.duration}
              {' Hours'}
            </Text>
          </View>
        </View>
      </>
    );
  }
}

interface LeaveDayListItemProps extends WithTheme {
  leave: Leave;
}

const styles = StyleSheet.create({
  statusText: {
    fontWeight: 'bold',
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});

export default withTheme<LeaveDayListItemProps>()(LeaveDayListItem);
