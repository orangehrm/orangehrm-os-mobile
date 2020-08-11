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
import {FlatList, View, RefreshControl, StyleSheet} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectEmployeeLeaveList} from 'store/leave/leave-list/selectors';
import {fetchLeaveList} from 'store/leave/leave-list/actions';
import Divider from 'components/DefaultDivider';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import LeaveListItem from 'screens/leave/components/LeaveListItem';
import {LEAVE_DETAILS, LEAVE_LIST} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {LeaveListLeaveRequest} from 'store/leave/leave-list/types';
import {selectCurrentRoute} from 'store/globals/selectors';
import {LeaveDetailsParam} from 'screens/leave/navigators/LeaveListNavigator';

class LeaveList extends React.Component<LeaveListProps> {
  constructor(props: LeaveListProps) {
    super(props);
    this.updateLeaveList();
  }

  onRefresh = () => {
    this.props.fetchLeaveList();
  };

  componentDidUpdate(prevProps: LeaveListProps) {
    if (
      prevProps.currentRoute !== this.props.currentRoute &&
      this.props.currentRoute === LEAVE_LIST
    ) {
      this.updateLeaveList();
    }
  }

  updateLeaveList = () => {
    if (this.props.leaveList === undefined) {
      this.props.fetchLeaveList();
    }
  };

  onPressLeave = (leaveRequest: LeaveListLeaveRequest) => () => {
    navigate<LeaveDetailsParam>(LEAVE_DETAILS, {leaveRequest});
  };

  render() {
    const {theme, leaveList} = this.props;
    return (
      <SafeAreaLayout>
        <FlatList
          data={leaveList}
          renderItem={({item}) => (
            <>
              <LeaveListItem
                leaveRequest={item}
                onPress={this.onPressLeave(item)}
              />
            </>
          )}
          keyExtractor={(item) => item.leaveRequestId}
          ItemSeparatorComponent={() => {
            return (
              <View style={{paddingHorizontal: theme.spacing}}>
                <Divider />
              </View>
            );
          }}
          ListFooterComponent={
            leaveList === undefined || leaveList?.length === 0 ? null : (
              <View
                style={{
                  paddingHorizontal: theme.spacing,
                  paddingBottom: theme.spacing * 4,
                }}>
                <Divider />
              </View>
            )
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={
            <View style={styles.emptyContentView}>
              <Icon
                name={'info-outline'}
                type={'MaterialIcons'}
                style={{
                  fontSize: theme.typography.largeIconSize,
                  paddingBottom: theme.spacing * 2,
                  marginTop: -theme.spacing * 2,
                }}
              />
              <Text>{'No Leave Requests Found.'}</Text>
            </View>
          }
        />
      </SafeAreaLayout>
    );
  }
}

interface LeaveListProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const styles = StyleSheet.create({
  emptyContentView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    flexGrow: 1,
  },
});

const mapStateToProps = (state: RootState) => ({
  leaveList: selectEmployeeLeaveList(state),
  currentRoute: selectCurrentRoute(state),
});

const mapDispatchToProps = {
  fetchLeaveList: fetchLeaveList,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveWithTheme = withTheme<LeaveListProps>()(LeaveList);

export default connector(MyLeaveWithTheme);
