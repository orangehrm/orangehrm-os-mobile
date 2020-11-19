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
import {AndroidEvent} from '@react-native-community/datetimepicker/src/index';

import DateTimePicker from '@react-native-community/datetimepicker';

class EditPunchInOutDateTimeCard extends React.Component<EditPunchInOutDateTimeCardProps,EditPunchInOutDateTimeCardState> {
  constructor(props: EditPunchInOutDateTimeCardProps) {
    super(props);
    this.state = {
      show : false,
      mode : DATE,
    };
  }

  onChange = (event: AndroidEvent , selectedDate? : Date ) => {
    this.setState({
      show : false,
    }, () => {
      if(selectedDate)
      this.props.updateDateTime(selectedDate); 
    });
  };
  
  formatTime = (time: string) => {
    let hourMinute = time.substring(0,5).split(':',2)
    let ampm = "AM";
    let hour = hourMinute[0];
    if(parseInt(hourMinute[0])>12){ hour = (parseInt(hourMinute[0]) -12).toString(); ampm = "PM"}
    return hour.toString()+":"+hourMinute[1]+" "+ ampm;
  }

  showDatepicker = () => {
    this.setState({show : true, mode : DATE});
  };

  showTimepicker = () => {
    this.setState({show : true, mode : TIME});
  };

  render() {
      const {
        theme,
        punchCurrentDateTime,
      } = this.props;
      const {
        mode, show,
      } = this.state;

      let date;
      if (punchCurrentDateTime === undefined){
        date = new Date();
      } else{
        date = punchCurrentDateTime;
      }
      const dateDisplay = date.toDateString();
      // const timeDisplay1 = date.toLocaleString([], { hour: 'numeric', minute: 'numeric', hour12: true });
      const timeDisplay = this.formatTime(date.toTimeString());

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
                    style={{flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing, marginBottom: theme.spacing*4}}
                    onPress={() => {
                        this.showDatepicker()
                    }}>
                    <View style={{flex: 1, flexDirection: 'row', paddingLeft: theme.spacing * 3}}>
                        <View style={{padding: theme.spacing, paddingRight: theme.spacing * 3}}>
                            <Icon name={'calendar-blank'} fontSize={20}/>
                        </View>
                        <View style={{}}>
                            <Text style={{fontSize: 18}}>
                                {"Date"}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: theme.spacing}}>                
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
                    style={{flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing *4, marginBottom: theme.spacing / 4}}
                    onPress={() => {
                        this.showTimepicker()
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
              {this.state.show? (
                <>
                 <View>
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={this.onChange}
                    />
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
}

interface EditPunchInOutDateTimeCardProps extends WithTheme {
  punchCurrentDateTime?: Date;
  updateDateTime : (date: Date) => void; 
}

interface EditPunchInOutDateTimeCardState {
  show : boolean;
  mode : typeof TIME | typeof DATE;
}

const styles = StyleSheet.create({
  validPeriodText: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  
});

const mapDispatchToProps = {
  fetchPunchStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const EditPunchInOutDateTimeCardCardWithTheme = withTheme<EditPunchInOutDateTimeCardProps>()(
    EditPunchInOutDateTimeCard,
);

const DATE = 'date';
const TIME = 'time';

export default connector(EditPunchInOutDateTimeCardCardWithTheme);
