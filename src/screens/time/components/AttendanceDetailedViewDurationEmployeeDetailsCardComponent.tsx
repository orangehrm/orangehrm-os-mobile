import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Chip from 'components/DefaultChip';
import {getLeaveColourById, getDurationFromHours} from 'lib/helpers/attendance';
import {LEAVE_STATUS_MAP} from 'lib/helpers/leave';
import {LeaveObject} from 'store/time/my-attendance/types';
import {connect} from 'react-redux';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {
  WORK_WEEK_FULL,
  WORK_WEEK_NON,
  WORK_WEEK_HALF,
  WorkWeek,
  Holiday,
} from 'store/leave/common-screens/types';

class AttendanceDetailedViewDurationEmployeeDetailsCardComponent extends React.Component<
  AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps
> {
  constructor(
    props: AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps,
  ) {
    super(props);
  }

  render() {
    const {theme} = this.props;
    return (
      <View
        style={{
          marginVertical: theme.spacing * 2.5,
          marginHorizontal: theme.spacing * 5,
        }}>
        <View>
          <Text
            style={[
              styles.textBold,
              {
                fontSize: theme.spacing * 4.5,
                marginBottom: theme.spacing * 2.5,
              },
            ]}>
            {this.props.date}
          </Text>
          {this.props.workweekResult !== '-1' &&
          this.props.workweekResult !== WORK_WEEK_FULL ? (
            <>
              <View>
                <Chip
                  fullWidth={false}
                  style={[
                    styles.alignSelfFlexStart,
                    styles.holidayBorderColour,
                    {
                      borderRadius: theme.spacing * 3.75,
                      paddingLeft: theme.spacing * 2.5,
                      paddingRight: theme.spacing * 2.5,
                      marginBottom: theme.spacing * 1.25,
                      borderWidth: theme.spacing * 0.5,
                    },
                  ]}>
                  <Text>
                    {this.props.workweekResult === WORK_WEEK_NON
                      ? 'Non-Working Day'
                      : 'Half Day'}
                  </Text>
                </Chip>
              </View>
            </>
          ) : null}
          <View>
            {this.props.holidays.map((holiday) => (
              <Chip
                fullWidth={false}
                style={[
                  styles.alignSelfFlexStart,
                  styles.holidayBorderColour,
                  {
                    borderRadius: theme.spacing * 3.75,
                    paddingLeft: theme.spacing * 2.5,
                    paddingRight: theme.spacing * 2.5,
                    marginBottom: theme.spacing * 1.25,
                    borderWidth: theme.spacing * 0.5,
                  },
                ]}>
                <Text>
                  {holiday.description}
                  {' - '}
                  {holiday.length === WORK_WEEK_HALF ? 'Half Day' : null}
                  {holiday.length === WORK_WEEK_FULL ? 'Full Day' : null}
                </Text>
              </Chip>
            ))}
          </View>
          <View>
            {this.props.leaves.map((leave) => (
              <Chip
                style={[
                  styles.alignSelfFlexStart,
                  {
                    backgroundColor: getLeaveColourById(
                      leave.leaveType.id.toString(),
                    ),
                    borderRadius: theme.spacing * 2.5,
                    paddingLeft: theme.spacing * 2.5,
                    paddingRight: theme.spacing * 2.5,
                    marginBottom: theme.spacing * 1.25,
                  },
                ]}>
                <Text style={[styles.leaveColor]}>
                  {leave.leaveType.type}
                  {' - '}
                  {LEAVE_STATUS_MAP[leave.status]}
                  {' - '}
                  {getDurationFromHours(parseFloat(leave.lengthHours))}
                  {' Hours'}
                </Text>
              </Chip>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.rowFlexDirection,
            styles.flexOne,
            {
              marginVertical: theme.spacing * 2.5,
            },
          ]}>
          <Text
            style={{
              fontSize: theme.spacing * 4,
            }}>
            {'Total Duration'}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.textBold,
              {
                fontSize: theme.spacing * 5.5,
                color: theme.palette.secondary,
              },
            ]}>
            {this.props.duration}
            {' Hours'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  mainView: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    overflow: 'hidden',
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
  centerItems: {
    alignItems: 'center',
  },

  rowFlexDirection: {
    flexDirection: 'row',
  },
  columnFlexDirection: {
    flexDirection: 'column',
  },
  positionAbsolute: {
    position: 'absolute',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignSelfFlexStart: {
    alignSelf: 'flex-start',
  },
  backgroundColorWhite: {
    backgroundColor: 'white',
  },
  hoursView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  borderLeftColorWhite: {
    borderLeftColor: 'white',
  },

  holidayBorderColour: {
    borderColor: '#acacac',
  },
  leaveColor: {
    color: '#fff',
  },
});

interface AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps
  extends WithTheme {
  duration: string;
  date: string;
  holidays: Holiday[];
  leaves: LeaveObject[];
  workweekResult?: string;
}
const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceSummaryWithTheme = withTheme<
  AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps
>()(AttendanceDetailedViewDurationEmployeeDetailsCardComponent);

export default connector(AttendanceSummaryWithTheme);
