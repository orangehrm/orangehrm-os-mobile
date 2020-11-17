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
import {View, StyleSheet, Platform, Alert} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {fetchPunchStatus} from 'store/time/attendance/actions';
import {selectPunchStatus} from 'store/time/attendance/selectors';
import Text from 'components/DefaultText';

import {navigate} from 'lib/helpers/navigation';
import CardButton from 'screens/leave/components/CardButton';
import Icon from 'components/DefaultIcon';
import EditPunchInOutDateTimeCard from 'screens/time/components/EditPunchInOutDateTimeCardComponent';
import PunchInOutDateTimeCard from 'screens/time/components/PunchInOutDateTimeCardComponent';

class Punch extends React.Component<PunchProps> {
  constructor(props: PunchProps) {
    super(props);
    props.fetchPunchStatus();
  }

  onRefresh = () => {
    this.props.fetchPunchStatus();
  };

  render() {
    const {theme ,punchStatus} = this.props;
    return (
      <MainLayout onRefresh = {this.onRefresh}> 
        <View style={{marginLeft: 10,marginTop: 20}}>
            <Text>{"PUNCH IN SCREEN"}</Text>

            <EditPunchInOutDateTimeCard />
            <PunchInOutDateTimeCard />
            <Text>{punchStatus?.punchTime}</Text>
            <Text>{punchStatus?.punchNote}</Text>
            <Text>{punchStatus?.PunchTimeZoneOffset}</Text>
            <Text>{punchStatus?.punchState}</Text>
            <Text>{punchStatus?.dateTimeEditable}</Text>
            <Text>{punchStatus?.currentUtcDateTime}</Text>
        </View>
      </MainLayout>
    );
  }
}

interface PunchProps extends WithTheme,
    ConnectedProps<typeof connector> {
   navigation: NavigationProp<ParamListBase>;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  detailsView: {
    marginTop: 1,
    marginLeft: 10,
  },
  detailsViewBlock: {
    marginTop: 15,
    marginLeft: 10,
  },
  detailsViewLabel: {
    marginLeft: 10,
  },
  marginForShadow: {
    ...Platform.select({
      ios: {
        marginBottom: 2,
      },
    }),
  },
  cardButton: {
    borderRadius: 0,
  },
  buttonLeftView: {
    flexDirection: 'row',
  },
  cardButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
});

const mapStateToProps = (state: RootState) => ({
  punchStatus: selectPunchStatus(state),
});

const mapDispatchToProps = {
  fetchPunchStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PunchWithTheme = withTheme<PunchProps>()(
  Punch, 
);

export default connector(PunchWithTheme);
