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
import {FlatList, View, StyleSheet, ViewProps} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import LeaveBalanceCard from 'screens/leave/components/LeaveBalanceCard';
import {selectLeaveType} from 'store/leave/leave-usage/actions';
import {Entitlement} from 'store/leave/leave-usage/types';

class LeaveBalanceRow extends React.Component<LeaveBalanceRowProps> {
  render() {
    const {
      theme,
      entitlement,
      style,
      marginHorizontal,
      selectedLeaveTypeId,
      selectLeaveTypeAction,
    } = this.props;

    if (selectedLeaveTypeId === undefined) {
      if (entitlement !== undefined && entitlement.length !== 0) {
        selectLeaveTypeAction(entitlement[0].id);
      }
    }

    return (
      <>
        <View
          style={[
            styles.root,
            {
              paddingVertical: theme.spacing * 3,
            },
            style,
          ]}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={entitlement}
            renderItem={({item}) => (
              <>
                <LeaveBalanceCard
                  leaveType={item.leaveType.type}
                  leaveBalance={item.leaveBalance.balance.toFixed(2)}
                  selectedColor={item.leaveType.color}
                  selected={selectedLeaveTypeId === item.id}
                  onPress={() => {
                    selectLeaveTypeAction(item.id);
                  }}
                />
              </>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => {
              return <View style={{paddingHorizontal: theme.spacing}} />;
            }}
            ListHeaderComponent={
              <View
                style={{
                  width: marginHorizontal
                    ? marginHorizontal
                    : theme.spacing * 4,
                }}
              />
            }
            ListFooterComponent={
              <View
                style={{
                  width: marginHorizontal
                    ? marginHorizontal
                    : theme.spacing * 4,
                }}
              />
            }
          />
        </View>
      </>
    );
  }
}

interface LeaveBalanceRowProps extends WithTheme, Pick<ViewProps, 'style'> {
  marginHorizontal?: number;
  entitlement?: Entitlement[];
  selectedLeaveTypeId?: string;
  selectLeaveTypeAction: typeof selectLeaveType;
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
});

export default withTheme<LeaveBalanceRowProps>()(LeaveBalanceRow);
