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
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {fetchMyLeaveEntitlements} from 'store/leave/leave-usage/actions';
import {selectLeaveType} from 'store/leave/leave-usage/actions';
import {
  selectEntitlement,
  selectSelectedLeaveTypeId,
  selectErrorMessage,
} from 'store/leave/leave-usage/selectors';
import {RootState} from 'store';
import LeaveBalanceRow from 'screens/leave/components/LeaveBalanceRow';
import LeaveUsageCard from 'screens/leave/components/LeaveUsageCard';
import LeaveUsageActions from 'screens/leave/components/LeaveUsageActions';
import FullInfoView from 'screens/common/component/FullInfoView';
import Fab, {FabSpace} from 'components/DefaultFab';
import {APPLY_LEAVE, MY_LEAVE_ENTITLEMENT_AND_USAGE} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {selectCurrentRoute} from 'store/globals/selectors';

class MyLeaveUsage extends React.Component<MyLeaveUsageProps> {
  componentDidMount() {
    this.props.fetchMyLeaveEntitlements();
  }

  componentDidUpdate(prevProps: MyLeaveUsageProps) {
    if (
      prevProps.currentRoute !== this.props.currentRoute &&
      this.props.currentRoute === MY_LEAVE_ENTITLEMENT_AND_USAGE &&
      this.props.entitlements === undefined
    ) {
      // update leave entitlements
      this.onRefresh();
    }
  }

  onRefresh = () => {
    this.props.fetchMyLeaveEntitlements();
  };

  onPressApplyLeave = () => {
    navigate(APPLY_LEAVE);
  };

  render() {
    const {
      theme,
      entitlements,
      selectedLeaveTypeId,
      selectLeaveTypeAction,
      errorMessage,
    } = this.props;
    return (
      <MainLayout
        onRefresh={this.onRefresh}
        footer={
          errorMessage ? null : (
            <Fab iconName={'plus'} primary onPress={this.onPressApplyLeave} />
          )
        }>
        {errorMessage ? (
          <FullInfoView message={errorMessage} />
        ) : (
          <>
            <LeaveBalanceRow
              entitlement={entitlements}
              selectedLeaveTypeId={selectedLeaveTypeId}
              selectLeaveTypeAction={selectLeaveTypeAction}
              style={{
                backgroundColor: theme.palette.backgroundSecondary,
                marginBottom: theme.spacing * 2,
              }}
            />
            <LeaveUsageCard />
            <LeaveUsageActions />
            <FabSpace />
          </>
        )}
      </MainLayout>
    );
  }
}

interface MyLeaveUsageProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  entitlements: selectEntitlement(state),
  selectedLeaveTypeId: selectSelectedLeaveTypeId(state),
  currentRoute: selectCurrentRoute(state),
  errorMessage: selectErrorMessage(state),
});

const mapDispatchToProps = {
  fetchMyLeaveEntitlements: fetchMyLeaveEntitlements,
  selectLeaveTypeAction: selectLeaveType,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveUsageWithTheme = withTheme<MyLeaveUsageProps>()(MyLeaveUsage);

export default connector(MyLeaveUsageWithTheme);
