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

const EditPunchInOutDateTimeCard = (props: EditPunchInOutDateTimeCardProps) => {
    const {theme, punchStatus} = props;
    let datetime=punchStatus?.currentUtcDateTime.split(" ",2);
    let nowTime = new Date();
    year = nowTime.getFullYear();
    month = nowTime.getMonth();
    date1 = nowTime.getDate();
    hour = nowTime.getHours();
    minutes = nowTime.getMinutes();
    
    if(Array.isArray(datetime)){
        if(datetime.length==2){
            let fullDate :string[] = datetime[0].split("-",3);
            let time :string[] = datetime[1].split(":",2);
            var year = parseInt(fullDate[0],10);
            var month = parseInt(fullDate[1],10);
            var date1 =parseInt(fullDate[2],10);
            var hour =parseInt(time[0],10);
            var minutes = parseInt(time[1],10);
        }
    }
    if(Array.isArray(datetime)){
      var [date, setDate] = useState(new Date(Date.UTC(year, month-1, date1, hour, minutes, 0)));
    } else {
      var [date, setDate] = useState(new Date(year, month-1, date1, hour, minutes, 0));
    }
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateDisplay ,setDisplayDate] = useState(date.toDateString());
    const [timeDisplay ,setDisplayTime] = useState(date.toLocaleString([], { hour: 'numeric', minute: 'numeric', hour12: true }));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if(mode=='date'){
          setDisplayDate(selectedDate.toDateString());
        } else if(mode=='time'){
          setDisplayTime(selectedDate.toLocaleString([], { hour: 'numeric', minute: 'numeric', hour12: true }));
        }
    };
    const showMode = (currentMode :string) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
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
                paddingTop: theme.spacing * 4,
                paddingHorizontal: theme.spacing * 3,
              }}>
              <TouchableOpacity
                    style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10}}
                    onPress={() => {
                        showDatepicker()
                    }}>
                    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10}}>
                        <View style={{padding: 3, paddingRight: 10}}>
                            <Icon name={'calendar-blank'} fontSize={20}/>
                        </View>
                        <View style={{}}>
                            <Text style={{fontSize: 18}}>
                                {"Date"}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>                
                            <Text style={{color: theme.palette.secondary, fontSize: 18}}>
                                {dateDisplay}</Text>
                            </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Icon name={'chevron-right'} fontSize={20}/>
                        </View>
                    </View>
                </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                    style={{flexDirection: 'row', justifyContent: 'center', marginTop: 1, marginBottom: 1}}
                    onPress={() => {
                        showTimepicker()
                    }}>
                    <View style={{flex: 1, flexDirection: 'row', paddingLeft: theme.spacing * 3}}>
                        <View style={{padding: theme.spacing, paddingRight:theme.spacing * 3}}>
                            <Icon name={'clock-outline'} fontSize={20}/>
                        </View>
                        <View style={{}}>
                            <Text style={{fontSize: 18}}>
                                {"Time"}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: theme.spacing}}>               
                            <Text style={{color: theme.palette.secondary, fontSize: 18}}>
                                {timeDisplay}</Text>
                            </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Icon name={'chevron-right'} fontSize={20}/>
                        </View>
                    </View>
                </TouchableOpacity>
              <View
                style={[
                  styles.validPeriodText,
                  {paddingVertical: theme.spacing * 2},
                ]}>
              </View>
              {show? (
                <>
                 <View>
                 {/* {show && ( */}
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                   {/* )} */}
                 </View>
                </>
               ):null}
            </CardContent>
            <CardActions>
              
            </CardActions>
          </Card>
        </View>

      </>
    ); 
  }
// }

interface EditPunchInOutDateTimeCardProps
  extends WithTheme,
    ConnectedProps<typeof connector>,
    Pick<ViewProps, 'style'> {}

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
  punchStatus: selectPunchStatus(state),
});

const mapDispatchToProps = {
  fetchPunchStatus,
};
  


const connector = connect(mapStateToProps, mapDispatchToProps);

const EditPunchInOutDateTimeCardCardWithTheme = withTheme<EditPunchInOutDateTimeCardProps>()(
    EditPunchInOutDateTimeCard,
);

export default connector(EditPunchInOutDateTimeCardCardWithTheme);
