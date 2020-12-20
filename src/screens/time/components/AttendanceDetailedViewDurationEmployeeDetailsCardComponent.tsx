import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Chip from 'components/DefaultChip';
import {getLeaveColourById, getDurationFromHours} from 'lib/helpers/attendance';
import {LEAVE_STATUS_MAP} from 'lib/helpers/leave';
import {
  LeaveObject,
  mode,
  EMPLOYEE_ATTENDANCE,
  MY_ATTENDANCE,
} from 'store/time/my-attendance/types';
import {connect} from 'react-redux';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {
  WORK_WEEK_FULL,
  WORK_WEEK_NON,
  WORK_WEEK_HALF,
  Holiday,
} from 'store/leave/common-screens/types';

class AttendanceDetailedViewDurationEmployeeDetailsCardComponent extends React.Component<AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps> {
  constructor(
    props: AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps,
  ) {
    super(props);
  }

  render() {
    const {theme, date, employeeName, mode} = this.props;
    return (
      <View
        style={{
          marginVertical: theme.spacing * 2.5,
          marginHorizontal: theme.spacing * 5,
        }}>
        {mode === EMPLOYEE_ATTENDANCE ? (
          <View
            style={[
              styles.rowFlexDirection,
              styles.flexOne,
              {paddingBottom: theme.spacing * 2.5},
            ]}>
            <View
              style={[
                styles.flexOne,
                {
                  paddingRight: theme.spacing * 2.5,
                },
              ]}
            />

            <View style={styles.flexFour}>
              <Text
                style={[
                  styles.textBold,
                  {
                    fontSize: theme.spacing * 4.5,
                  },
                ]}>
                {employeeName}
              </Text>
              <View>
                <Text
                  style={[
                    styles.flexSix,
                    {
                      fontSize: theme.spacing * 3.75,
                    },
                  ]}>
                  {date}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
        <View>
          {mode === MY_ATTENDANCE ? (
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
          ) : null}
          {this.props.workweekResult !== '-1' &&
          this.props.workweekResult !== WORK_WEEK_FULL ? (
            <>
              <View>
                <Chip
                  fullWidth={false}
                  style={[
                    styles.alignSelfFlexStart,
                    {
                      borderColor: theme.palette.backgroundSecondary,
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
                  {
                    borderColor: theme.palette.backgroundSecondary,
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
                    paddingLeft: theme.spacing * 2.5,
                    paddingRight: theme.spacing * 2.5,
                    marginBottom: theme.spacing * 1.25,
                  },
                ]}>
                <Text style={{color: theme.palette.background}}>
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
  textBold: {
    fontWeight: 'bold',
  },
  flexOne: {
    flex: 1,
  },
  flexFour: {
    flex: 4,
  },
  flexSix: {
    flex: 6,
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  alignSelfFlexStart: {
    alignSelf: 'flex-start',
  },
});

interface AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps
  extends WithTheme {
  duration: string;
  date: string;
  holidays: Holiday[];
  leaves: LeaveObject[];
  workweekResult?: string;
  employeeName?: string;
  mode: mode;
}

const connector = connect(null, null);

const AttendanceSummaryWithTheme = withTheme<AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps>()(
  AttendanceDetailedViewDurationEmployeeDetailsCardComponent,
);

export default connector(AttendanceSummaryWithTheme);
