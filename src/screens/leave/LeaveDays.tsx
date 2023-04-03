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

import React, {Fragment} from 'react';
import {View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Divider from 'components/DefaultDivider';
import {LeaveDaysRouteParams} from 'screens/leave/navigators';
import LeaveDayListItem from 'screens/leave/components/LeaveDayListItem';
import {fetchEmployeeLeaves} from 'store/leave/leave-list/actions';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectEmployeeLeaves} from 'store/leave/leave-list/selectors';

class LeaveDays extends React.Component<LeaveDaysProps> {
  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    const {leaveRequest} = this.props.route.params;
    this.props.fetchEmployeeLeaves(leaveRequest.id);
  };

  render() {
    const {theme, employeeLeaves} = this.props;
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <View>
          {employeeLeaves &&
            employeeLeaves.map((leave, index) => (
              <Fragment key={index}>
                <LeaveDayListItem leave={leave} />
                <View style={{paddingHorizontal: theme.spacing}}>
                  <Divider />
                </View>
              </Fragment>
            ))}
        </View>
      </MainLayout>
    );
  }
}

interface LeaveDaysProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  route: LeaveDaysRouteParams;
}

const mapStateToProps = (state: RootState) => ({
  employeeLeaves: selectEmployeeLeaves(state),
});

const mapDispatchToProps = {
  fetchEmployeeLeaves: fetchEmployeeLeaves,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const LeaveDaysWithTheme = withTheme<LeaveDaysProps>()(LeaveDays);

export default connector(LeaveDaysWithTheme);
