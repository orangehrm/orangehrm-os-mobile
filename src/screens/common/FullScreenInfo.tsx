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
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectMenuItemsMetaData, selectMenuItems} from 'store/auth/selectors';
import {fetchMenuItems} from 'store/auth/actions';
import FullInfoView from 'screens/common/component/FullInfoView';
import {MENU_LEAVE, MENU_TIME} from 'store/auth/types';
import {getNavigation} from 'lib/helpers/navigation';

class FullScreenError extends React.Component<FullScreenErrorProps> {
  onRefresh = () => {
    this.props.fetchMenuItems();
  };

  componentDidUpdate(prevProps: FullScreenErrorProps) {
    if (
      JSON.stringify(this.props.menuItemsMetaData) !==
      JSON.stringify(prevProps.menuItemsMetaData)
    ) {
      try {
        getNavigation()?.resetRoot();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }

  render() {
    const {menuItemsMetaData, menuItems} = this.props;
    let message = 'Unexpected Error Occurred';

    if (!menuItems.has(MENU_LEAVE) && !menuItems.has(MENU_TIME)) {
      message = 'Leave and Time Modules Are Disabled';
    } else if (
      menuItems.has(MENU_LEAVE) &&
      !menuItemsMetaData?.isLeavePeriodDefined
    ) {
      message = 'Leave Period Is Not Defined';
    } else if (
      !menuItems.has(MENU_LEAVE) &&
      menuItems.has(MENU_TIME) &&
      !menuItemsMetaData?.isTimesheetPeriodDefined
    ) {
      message = 'Timesheet Period Is Not Defined';
    }

    message += ', Please Contact Your System Administrator.';
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <FullInfoView message={message} />
      </MainLayout>
    );
  }
}

interface FullScreenErrorProps extends ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  menuItemsMetaData: selectMenuItemsMetaData(state),
  menuItems: selectMenuItems(state),
});

const mapDispatchToProps = {
  fetchMenuItems: fetchMenuItems,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(FullScreenError);
