import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../../common/services/ColorService';
import DateService from '../../../common/services/DateService';
import Icon from '../../../common/components/Icon';
import DatePickerComponent from '../../time/components/datePickerComponent';
import TimePickerComponent from '../../time/components/timePickerComponent';
import LocalizationLanguageService from '../../../common/services/LocalizationLanguageService';
import Divider from '../../../common/components/Divider';

const EditPunchInOutDateTimeCardComponent: () => React$Node = (props) => {
    return (
        <View>
            {props.punchDate && props.punchTime ? <View style={{
                margin: 10,
                marginHorizontal: 20,
                borderRadius: 20,
                paddingBottom: 20,
                paddingTop: 20,
                paddingRight: 5,
                paddingLeft: 5,
                backgroundColor: 'white',
                overflow: 'hidden',
            }}>

                <TouchableOpacity
                    style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10}}
                    onPress={() => {
                        props.onPressDate();
                    }}>
                    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10}}>
                        <View style={{padding: 3, paddingRight: 10}}>
                            <Icon.MaterialCommunityIcons name={'calendar-blank'} size={20}/>
                        </View>
                        <View style={{}}>
                            <Text style={{fontSize: 18}}>
                                {LocalizationLanguageService.translate('Date')}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
                            <Text style={{color: Colors.LINK_COLOR, fontSize: 18}}>
                                {DateService.convertDateObjectToStringFormat(props.punchDate, 'ddd, DD MMM YYYY')}
                            </Text>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Icon.MaterialCommunityIcons name={'chevron-right'} size={20}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider/>
                <TouchableOpacity
                    style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}
                    onPress={() => {
                        props.onPressTime();
                    }}>
                    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10}}>
                        <View style={{padding: 3, paddingRight: 10}}>
                            <Icon.MaterialCommunityIcons name={'clock-outline'} size={20}/>
                        </View>
                        <Text
                            style={{fontSize: 18}}>
                            {LocalizationLanguageService.translate('Time')}
                        </Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
                            <Text
                                style={{color: Colors.LINK_COLOR, fontSize: 18}}>
                                {DateService.convertDateObjectToStringFormat(props.punchTime, 'hh:mm A')}
                            </Text>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Icon.MaterialCommunityIcons name={'chevron-right'} size={20}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View>
                    <DatePickerComponent isVisible={props.showDatePicker}
                                         defaultValue={new Date(props.punchDate)} display={'calendar'}
                                         onConfirm={(date) => {
                                             props.onDateChange(date);

                                         }} onCancel={() => {
                        props.onDatePickerCancel();
                    }}/>
                    <TimePickerComponent isVisible={props.showTimePicker}
                                         defaultValue={new Date(props.punchTime)}
                                         display={'spinner'} is24Hour={false} onConfirm={(time) => {
                        props.onTimeChange(time);

                    }} onCancel={() => {
                        props.onTimePickerCancel();
                    }}/>
                </View>
            </View> : null}
        </View>
    );
};

EditPunchInOutDateTimeCardComponent.propTypes = {
    onPressDate: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onDatePickerCancel: PropTypes.func.isRequired,
    onPressTime: PropTypes.func.isRequired,
    onTimeChange: PropTypes.func.isRequired,
    onTimePickerCancel: PropTypes.func.isRequired,
    showDatePicker: PropTypes.bool,
    showTimePicker: PropTypes.bool,
    punchDate: PropTypes.object,
    punchTime: PropTypes.object,
};

EditPunchInOutDateTimeCardComponent.defaultProps = {
    showDatePicker: false,
    showTimePicker: false,
};

export default EditPunchInOutDateTimeCardComponent;

