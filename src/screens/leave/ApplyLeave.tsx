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
import {View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectEntitlement,
  selectSelectedLeaveTypeId,
} from 'store/leave/leave-usage/selectors';
import {selectLeaveType} from 'store/leave/leave-usage/actions';
import LeaveBalanceRow from 'screens/leave/components/LeaveBalanceRow';

class ApplyLeave extends React.Component<ApplyLeaveProps> {
  render() {
    const {
      theme,
      entitlements,
      selectedLeaveTypeId,
      selectLeaveTypeAction,
    } = this.props;
    return (
      <MainLayout>
        <View style={{backgroundColor: theme.palette.backgroundSecondary}}>
          <LeaveBalanceRow
            entitlement={entitlements}
            selectedLeaveTypeId={selectedLeaveTypeId}
            selectLeaveTypeAction={selectLeaveTypeAction}
          />
        </View>
      </MainLayout>
    );
  }
}

interface ApplyLeaveProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  entitlements: selectEntitlement(state),
  selectedLeaveTypeId: selectSelectedLeaveTypeId(state),
});

const mapDispatchToProps = {
  selectLeaveTypeAction: selectLeaveType,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ApplyLeaveWithTheme = withTheme<ApplyLeaveProps>()(ApplyLeave);

export default connector(ApplyLeaveWithTheme);
