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
import {StyleSheet, View, ViewProps} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectLeaveType} from 'store/leave/leave-usage/actions';
import {
  selectEntitlement,
  selectSelectedLeaveTypeId,
} from 'store/leave/leave-usage/selectors';
import ProgressCircle from 'screens/leave/components/ProgressCircle';
import Card from 'components/DefaultCard';
import CardContent from 'components/DefaultCardContent';
import CardActions from 'components/DefaultCardActions';
import Chip from 'components/DefaultChip';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';

class LeaveUsageCard extends React.Component<LeaveUsageCardProps> {
  /**
   * Calculate complete ratio for progress circle
   */
  calculateProgress = (total?: number, used?: number) => {
    if (total === undefined || used === undefined) {
      return 0;
    }
    if (used > total) {
      return 1;
    } else {
      return Math.round((used / total) * 10) / 10;
    }
  };

  render() {
    const {theme, entitlement, selectedLeaveTypeId} = this.props;

    const selectedLeaveType = entitlement?.find(
      (item) => item.id === selectedLeaveTypeId,
    );

    return (
      <>
        <View
          style={{
            paddingHorizontal: theme.spacing * 5,
            paddingBottom: theme.spacing * 4,
          }}>
          <Card
            fullWidth
            style={{
              borderRadius: theme.borderRadius * 2,
            }}>
            <CardContent
              style={{
                paddingTop: theme.spacing * 4,
                paddingHorizontal: theme.spacing * 3,
              }}>
              <View
                style={[
                  styles.chipView,
                  {
                    paddingBottom: theme.spacing * 2,
                  },
                ]}>
                <Chip
                  style={[
                    {
                      paddingVertical: theme.spacing,
                      paddingHorizontal: theme.spacing * 4,
                    },
                    selectedLeaveType?.leaveType.color !== undefined
                      ? {
                          backgroundColor: selectedLeaveType?.leaveType.color,
                        }
                      : undefined,
                  ]}>
                  <Text
                    numberOfLines={1}
                    style={{color: theme.typography.lightColor}}>
                    {selectedLeaveType?.leaveType.type
                      ? selectedLeaveType?.leaveType.type
                      : '- -'}
                  </Text>
                </Chip>
              </View>
              <Divider />
              <View
                style={[
                  styles.validPeriodText,
                  {paddingVertical: theme.spacing * 2},
                ]}>
                <Text>
                  {selectedLeaveType?.validFrom
                    ? selectedLeaveType?.validFrom
                    : '- -'}
                  {' to '}
                  {selectedLeaveType?.validTo
                    ? selectedLeaveType?.validTo
                    : '- -'}
                </Text>
              </View>
              <Divider />
              <ProgressCircle
                progress={this.calculateProgress(
                  selectedLeaveType?.leaveBalance.entitled,
                  selectedLeaveType?.leaveBalance.used,
                )}
                usedDays={selectedLeaveType?.leaveBalance.used.toFixed(2)}
                mainColor={selectedLeaveType?.leaveType.color}
              />
            </CardContent>
            <CardActions
              style={{
                borderBottomLeftRadius: theme.borderRadius * 2,
                borderBottomRightRadius: theme.borderRadius * 2,
                backgroundColor: theme.palette.default,
              }}>
              <View
                style={[
                  styles.totalEntitlementView,
                  {
                    paddingHorizontal: theme.spacing * 4,
                    paddingTop: theme.spacing * 4,
                    paddingBottom: theme.spacing * 2,
                  },
                ]}>
                <Text>{'Total Entitlement'}</Text>
                <Text>
                  {selectedLeaveType?.leaveBalance.entitled
                    ? selectedLeaveType?.leaveBalance.entitled.toFixed(2)
                    : '0.00'}
                  {' Day(s)'}
                </Text>
              </View>
            </CardActions>
          </Card>
        </View>
      </>
    );
  }
}

interface LeaveUsageCardProps
  extends WithTheme,
    ConnectedProps<typeof connector>,
    Pick<ViewProps, 'style'> {}

const styles = StyleSheet.create({
  validPeriodText: {
    alignItems: 'center',
  },
  totalEntitlementView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipView: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  entitlement: selectEntitlement(state),
  selectedLeaveTypeId: selectSelectedLeaveTypeId(state),
});

const mapDispatchToProps = {
  selectLeaveType: selectLeaveType,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const LeaveUsageCardWithTheme = withTheme<LeaveUsageCardProps>()(
  LeaveUsageCard,
);

export default connector(LeaveUsageCardWithTheme);
