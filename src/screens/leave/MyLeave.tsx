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
import {FlatList, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectLeaveRequests} from 'store/leave/leave-usage/selectors';
import {selectEntitlement} from 'store/leave/leave-usage/selectors';
import {
  fetchMyLeaveRequests,
  fetchMyLeaveEntitlements,
} from 'store/leave/leave-usage/actions';
import Divider from 'components/DefaultDivider';
import MyLeaveListItem from 'screens/leave/components/MyLeaveListItem';

class MyLeave extends React.Component<MyLeaveProps> {
  constructor(props: MyLeaveProps) {
    super(props);
    if (this.props.leaveRequests === undefined) {
      this.props.fetchMyLeaveRequests();
    }
    this.updateEntitlements();
  }

  onRefresh = () => {
    this.props.fetchMyLeaveRequests();
    this.updateEntitlements();
  };

  updateEntitlements = () => {
    if (this.props.entitlements === undefined) {
      this.props.fetchMyLeaveEntitlements();
    }
  };

  render() {
    const {theme, leaveRequests} = this.props;
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <FlatList
          data={leaveRequests}
          renderItem={({item}) => (
            <>
              <MyLeaveListItem leaveRequest={item} />
            </>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => {
            return (
              <View style={{paddingHorizontal: theme.spacing}}>
                <Divider />
              </View>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                paddingHorizontal: theme.spacing,
                paddingBottom: theme.spacing * 4,
              }}>
              <Divider />
            </View>
          }
        />
      </MainLayout>
    );
  }
}

interface MyLeaveProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  leaveRequests: selectLeaveRequests(state),
  entitlements: selectEntitlement(state),
});

const mapDispatchToProps = {
  fetchMyLeaveRequests: fetchMyLeaveRequests,
  fetchMyLeaveEntitlements: fetchMyLeaveEntitlements,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveWithTheme = withTheme<MyLeaveProps>()(MyLeave);

export default connector(MyLeaveWithTheme);
