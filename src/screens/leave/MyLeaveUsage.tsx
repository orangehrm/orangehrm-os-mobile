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
import {fetchMyLeave} from 'store/leave/leave-usage/actions';
import LeaveBalanceRow from 'screens/leave/components/LeaveBalanceRow';

class MyLeaveUsage extends React.Component<MyLeaveUsageProps> {
  constructor(props: MyLeaveUsageProps) {
    super(props);
    this.props.fetchMyLeave();
  }

  render() {
    return (
      <MainLayout>
        <LeaveBalanceRow />
      </MainLayout>
    );
  }
}

interface MyLeaveUsageProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  fetchMyLeave: fetchMyLeave,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withTheme<MyLeaveUsageProps>()(connector(MyLeaveUsage));
