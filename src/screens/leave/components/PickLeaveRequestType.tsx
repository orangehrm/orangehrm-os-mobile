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
import {StyleSheet, View, ViewProps, Platform} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import CardButton from 'components/CardButton';
import Icon from 'components/DefaultIcon';
import Chip from 'components/DefaultChip';
import LeaveBalanceRow, {
  LeaveBalanceRowProps,
} from 'screens/leave/components/LeaveBalanceRow';

class PickLeaveType extends React.Component<PickLeaveTypeProps> {
  render() {
    const {theme, style, ...leaveBalanceRowProps} = this.props;
    const {entitlement, selectedLeaveTypeId} = leaveBalanceRowProps;
    const selectedLeaveType = entitlement?.find(
      (item) => item.id === selectedLeaveTypeId,
    );
    const leaveTypeColor = selectedLeaveType?.leaveType.color;

    return (
      <>
        <View style={style}>
          <CardButton
            style={[
              styles.cardButton,
              {height: theme.spacing * 12},
              styles.marginForShadow,
            ]}
            rounded={false}>
            <View
              style={[
                styles.cardButtonContent,
                {
                  paddingTop: theme.spacing * 2,
                  paddingRight: theme.spacing * 4,
                },
              ]}>
              <View style={styles.buttonLeftView}>
                <Icon name={'briefcase'} />
                <Text style={{paddingTop: theme.spacing * 0.5}}>
                  {'Leave Type'}
                </Text>
              </View>
              <View>
                <Chip
                  style={[
                    {
                      paddingVertical: theme.spacing,
                      paddingHorizontal: theme.spacing * 3,
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
                    {selectedLeaveType
                      ? selectedLeaveType?.leaveType.name
                      : '--'}
                  </Text>
                </Chip>
              </View>
            </View>
          </CardButton>
          <LeaveBalanceRow
            style={{backgroundColor: theme.palette.backgroundSecondary}}
            {...leaveBalanceRowProps}
          />
        </View>
      </>
    );
  }
}

interface PickLeaveTypeProps
  extends WithTheme,
    Pick<ViewProps, 'style'>,
    LeaveBalanceRowProps {}

const styles = StyleSheet.create({
  buttonLeftView: {
    flexDirection: 'row',
  },
  cardButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  cardButton: {
    borderRadius: 0,
  },
  marginForShadow: {
    ...Platform.select({
      ios: {
        marginBottom: 2,
      },
    }),
  },
});

export default withTheme<PickLeaveTypeProps>()(PickLeaveType);
