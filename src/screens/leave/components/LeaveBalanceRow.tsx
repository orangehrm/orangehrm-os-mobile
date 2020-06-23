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
import {connect, ConnectedProps} from 'react-redux';
import LeaveBalanceCard from 'screens/leave/components/LeaveBalanceCard';
import {RootState} from 'store';
import {selectLeaveType} from 'store/leave/leave-usage/actions';
import {
  selectEntitlement,
  selectSelectedLeaveTypeId,
} from 'store/leave/leave-usage/selectors';

class LeaveBalanceRow extends React.Component<LeaveBalanceRowProps> {
  render() {
    const {
      theme,
      entitlement,
      style,
      marginHorizontal,
      selectedLeaveTypeId,
    } = this.props;

    if (selectedLeaveTypeId === undefined) {
      if (entitlement !== undefined && entitlement.length !== 0) {
        this.props.selectLeaveType(entitlement[0].id);
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
                  leaveType={item.type}
                  leaveBalance={item.leaveBalance.balance.toFixed(2)}
                  selectedColor={item.leaveType.color}
                  selected={selectedLeaveTypeId === item.id}
                  onPress={() => {
                    this.props.selectLeaveType(item.id);
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

interface LeaveBalanceRowProps
  extends WithTheme,
    ConnectedProps<typeof connector>,
    Pick<ViewProps, 'style'> {
  marginHorizontal?: number;
}

const styles = StyleSheet.create({
  root: {
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

const LeaveBalanceRowWithTheme = withTheme<LeaveBalanceRowProps>()(
  LeaveBalanceRow,
);

export default connector(LeaveBalanceRowWithTheme);
