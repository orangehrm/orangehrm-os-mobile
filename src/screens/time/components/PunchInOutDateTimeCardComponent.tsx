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

import React,{useState} from 'react';
import {StyleSheet,TouchableOpacity, View, ViewProps, Platform, Button, Alert} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectLeaveType} from 'store/leave/leave-usage/actions';
import {
  selectEntitlement,
  selectSelectedLeaveTypeId,
} from 'store/leave/leave-usage/selectors';
import ProgressCircle from 'screens/leave/components/ProgressCircle';
import Card from 'components/DefaultCard';
import CardContent from 'components/DefaultCardContent';
import CardActions from 'components/DefaultCardActions';
import Chip from 'components/DefaultChip';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import {fetchPunchStatus} from 'store/time/attendance/actions';
import {selectPunchStatus} from 'store/time/attendance/selectors';
import Icon from 'components/DefaultIcon';


import DateTimePicker from '@react-native-community/datetimepicker';

const PunchInOutDateTimeCard = (props: PunchInOutDateTimeCardProps) => {
    const {theme, punchCurrentDateTime} = props;
    
    let date;
    if (punchCurrentDateTime === undefined){
      date = new Date();
    } else {
      date = punchCurrentDateTime;
    } 
    const formatTime = (time: string) => {
      let hourMinute = time.substring(0,5).split(':',2)
      let ampm = "AM";
      let hour = hourMinute[0];
      if(parseInt(hourMinute[0])>12){ hour = (parseInt(hourMinute[0]) -12).toString(); ampm = "PM"}
      return hour.toString()+":"+hourMinute[1]+ ampm;
    }
  
    const dateDisplay  = date.toDateString();
    // const timeDisplay = date.toLocaleString([], { hour: 'numeric', minute: 'numeric', hour12: true });
    const timeDisplay = formatTime(date.toTimeString());
    return (   
      <>
        <View
          style={{
            paddingHorizontal: theme.spacing * 5,
            paddingBottom: theme.spacing * 4,
          }}>
          <Card
            fullWidth
            style={{
              borderRadius: theme.borderRadius * 2,
            }}
            >
            <CardContent
              style={{
                paddingTop: theme.spacing * 2,
                paddingHorizontal: theme.spacing * 3,
              }}>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 1}}>
                    <Text
                        style={{
                            color: theme.typography.primaryColor,
                            fontSize: 20,}}>
                              {dateDisplay}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text
                        style={{
                            color: theme.typography.primaryColor,
                            fontSize: 40,
                            fontWeight: 'bold',
                        }}>
                          {timeDisplay.substring(0,timeDisplay.length-2)}
                    </Text>
                    <Text
                        style={{
                            color: theme.typography.primaryColor,
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 25,
                            marginBottom: 10,
                        }}>
                          {timeDisplay.substring(timeDisplay.length-2,timeDisplay.length).toUpperCase()}
                    </Text>
                </View>
              
            </CardContent>
            <CardActions>
              
            </CardActions>
          </Card>
        </View>

      </>
    ); 
  }
// }

interface PunchInOutDateTimeCardProps extends WithTheme {
  punchCurrentDateTime?: Date;
}

const styles = StyleSheet.create({
  validPeriodText: {
    alignItems: 'center',
  },
  totalEntitlementView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipView: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  
});

const mapDispatchToProps = {
  fetchPunchStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PunchInOutDateTimeCardWithTheme = withTheme<PunchInOutDateTimeCardProps>()(
    PunchInOutDateTimeCard,
);

export default connector(PunchInOutDateTimeCardWithTheme);
