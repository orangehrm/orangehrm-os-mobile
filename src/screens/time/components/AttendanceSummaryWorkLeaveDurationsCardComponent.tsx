import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import useTheme from 'lib/hook/useTheme';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import Divider from 'components/DefaultDivider';
import CardContent from 'components/DefaultCardContent';
import {GraphLeaveType} from 'store/time/my-attendance/types';
import CardButton from 'screens/leave/components/CardButton';

const AttendanceSummaryWorkLeaveDurationsCardComponent = (
  props: AttendanceSummaryWorkLeaveDurationsCardComponentProps,
) => {
  const theme = useTheme();
  const {totalLeaveDuration, totalWorkDuration} = props;
  return (
    <CardContent
      style={{
        paddingTop: theme.spacing * 2,
        paddingHorizontal: theme.spacing * 3,
        backgroundColor: theme.palette.backgroundSecondary,
      }}>
      <View
        style={[
          styles.overflowHidden,
          styles.backgroundColorWhite,
          {
            borderRadius: theme.spacing * 1.25,
            marginHorizontal: theme.spacing * 2.5,
            marginTop: theme.spacing * 2.5,
          },
        ]}>
        <View
          style={{
            paddingTop: theme.spacing * 4.5,
            paddingHorizontal: theme.spacing * 3.75,
            paddingBottom: theme.spacing * 2.5,
          }}>
          <View style={[styles.rowFlexDirection, styles.alignItemsCenter]}>
            <View style={{flex: 9}}>
              <Text
                numberOfLines={2}
                style={[
                  styles.textBold,
                  {
                    fontSize: theme.spacing * 4,
                    color: theme.palette.secondary,
                  },
                ]}>
                {'Total Work Duration'}
              </Text>
            </View>
            <View style={[styles.flexFour, styles.rowFlexDirection]}>
              <View style={[styles.flexTwo]}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.textBold,
                    {
                      fontSize: theme.spacing * 4,
                      color: theme.palette.secondary,
                    },
                  ]}>
                  {totalWorkDuration}
                </Text>
              </View>
              <View style={[styles.flexTwo, {paddingTop: theme.spacing * 0.5}]}>
                <Text
                  style={[styles.textBold, {color: theme.palette.secondary}]}>
                  {'Hours'}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.rowFlexDirection,
              styles.alignItemsCenter,
              {
                marginTop: theme.spacing * 2.5,
              },
            ]}>
            <View style={[styles.flexNine, styles.rowFlexDirection]}>
              <Text
                numberOfLines={2}
                style={[
                  styles.textBold,
                  styles.colorGray,
                  {
                    fontSize: theme.spacing * 4,
                  },
                ]}>
                {'Total Leave Duration'}
              </Text>
            </View>
            <View style={[styles.rowFlexDirection, styles.flexFour]}>
              <View style={[styles.flexTwo]}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.textBold,
                    styles.colorGray,
                    {
                      fontSize: theme.spacing * 4,
                    },
                  ]}>
                  {totalLeaveDuration}
                </Text>
              </View>
              <View style={[styles.flexTwo, {paddingTop: theme.spacing * 0.5}]}>
                <Text style={[styles.colorGray, styles.textBold]}>
                  {'Hours'}
                </Text>
              </View>
            </View>
          </View>

          {props.leaveData?.length > 0 ? (
            <View style={{paddingTop: theme.spacing * 2.5}}>
              {props.leaveData.map((leave) => {
                return (
                  <View
                    style={{
                      paddingLeft: theme.spacing * 2.5,
                    }}>
                    <View
                      style={[
                        styles.rowFlexDirection,
                        styles.justifyContentSpaceBetween,
                        {
                          paddingVertical: theme.spacing * 2.5,
                        },
                      ]}>
                      <View style={[styles.flexOne]}>
                        <Icon
                          name={'circle'}
                          fontSize={theme.spacing * 3}
                          style={{color: leave.colour, flex: 1}}
                        />
                      </View>
                      <View style={[styles.flexEight]}>
                        <Text
                          style={{
                            paddingLeft: theme.spacing * 2.5,
                            fontSize: theme.spacing * 3.5,

                            color: leave.colour,
                          }}>
                          {leave.type}
                        </Text>
                      </View>

                      <View style={[styles.rowFlexDirection, styles.flexFour]}>
                        <View style={[styles.flexOne]}>
                          <Text
                            style={[
                              styles.totalLeaveTypeText,
                              {
                                fontSize: theme.spacing * 3.5,
                              },
                            ]}>
                            {leave.duration}
                          </Text>
                        </View>
                        <View style={[styles.flexOne]}>
                          <Text
                            style={[
                              styles.totalLeaveTypeText,
                              {
                                marginTop: theme.spacing * 0.125,
                                fontSize: theme.spacing * 3.5,
                              },
                            ]}>
                            {' Hours'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>

        <Divider />
        <View>
          <CardButton
            style={[
              styles.cardButton,
              {height: theme.spacing * 12},
              styles.marginForShadow,
            ]}
            onPress={props.onPressDetails}>
            <View style={[styles.cardButtonContent]}>
              <View style={styles.buttonLeftView}>
                <Icon name={'information'} />
                <Text style={{paddingTop: theme.spacing * 0.5}}>
                  {'Attendance Details'}
                </Text>
              </View>
              <Icon name={'chevron-right'} />
            </View>
          </CardButton>
        </View>
      </View>
    </CardContent>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  noRecordsTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    textAlign: 'center',
  },
  durationMainView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  durationText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  briefcaseIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
  },

  textBold: {
    fontWeight: 'bold',
  },

  lastRecordDetailsMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
  },

  lastPunchText: {
    flex: 2,
    flexDirection: 'column',
  },

  colorWhite: {
    color: 'white',
  },
  colorGray: {
    color: 'gray',
  },
  flexFour: {
    flex: 4,
  },
  flexTwo: {
    flex: 2,
  },
  flexOne: {
    flex: 1,
  },
  flexThree: {
    flex: 3,
  },
  flexNine: {
    flex: 9,
  },
  flexEight: {
    flex: 8,
  },
  centerItems: {
    alignItems: 'center',
  },

  rowFlexDirection: {
    flexDirection: 'row',
  },
  hoursView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  backgroundColorWhite: {
    backgroundColor: 'white',
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  totalLeaveTypeText: {
    fontWeight: '500',
    color: 'black',
  },
  cardButton: {
    borderRadius: 0,
  },
  marginForShadow: {
    ...Platform.select({
      ios: {
        marginBottom: 2,
      },
    }),
  },
  cardButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  buttonLeftView: {
    flexDirection: 'row',
  },
});

interface AttendanceSummaryWorkLeaveDurationsCardComponentProps {
  totalLeaveDuration: string;
  totalWorkDuration: string;
  leaveData: GraphLeaveType[];
  onPressDetails: () => void;
}

export default AttendanceSummaryWorkLeaveDurationsCardComponent;
