import React from 'react';
import {View, Platform, Text, StyleSheet} from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
} from 'victory-native';
import Svg from 'react-native-svg';
import {
  GraphDataPoint,
  LeaveTypeGraphData,
} from 'store/time/my-attendance/types';
import useTheme from 'lib/hook/useTheme';
import CardContent from 'components/DefaultCardContent';

const AttendanceDailyChartComponent = (
  props: AttendanceDailyChartComponentProps,
) => {
  const theme = useTheme();

  let renderGraph = () => {
    return (
      <CardContent
        style={{
          paddingTop: theme.spacing * 2,
          paddingHorizontal: theme.spacing * 3,
          backgroundColor: theme.palette.backgroundSecondary,
        }}>
        <View style={[styles.mainView]}>
          <View style={[styles.dailyHoursView]}>
            <Text style={[styles.dailyHoursText]}>{'Daily Hours'}</Text>
          </View>
          <VictoryChart domainPadding={15}>
            <VictoryAxis
              dependentAxis
              style={{
                axis: {stroke: 'white'},
                grid: {stroke: '#f2f3f5'},
                ticks: {
                  stroke: '#f2f3f5',
                  fontSize: 5,
                },
                tickLabels: {fontSize: 10, padding: 5},
              }}
              tickLabelComponent={
                <VictoryLabel
                  text={(datum) => {
                    let tickValue = datum.ticks[datum.index];
                    if (Number.isInteger(tickValue)) {
                      return tickValue + ' Hrs';
                    } else {
                      return '';
                    }
                  }}
                />
              }
            />
            <VictoryAxis
              style={{
                grid: {stroke: 'white'},
                ticks: {stroke: '#f2f3f5', fontSize: 5},
                tickLabels: {fontSize: 10, padding: 5},
              }}
              tickFormat={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
            />
            <VictoryAxis
              style={{
                grid: {stroke: 'white'},
                ticks: {stroke: '#f2f3f5', fontSize: 5},
                tickLabels: {fontSize: 10, padding: 20},
              }}
              tickFormat={props.dateOfMonth}
            />

            <VictoryStack colorScale={['tomato', 'orange', 'gold']}>
              <VictoryBar
                style={{data: {fill: theme.palette.secondary}}}
                data={props.graphWorkData}
              />
              {props.graphLeaveData.map((leaveTypeData) => {
                return (
                  <VictoryBar
                    style={{data: {fill: leaveTypeData.colour}}}
                    data={leaveTypeData.data}
                  />
                );
              })}
            </VictoryStack>
          </VictoryChart>
        </View>
      </CardContent>
    );
  };

  return (
    <View>
      {Platform.OS === 'ios' ? renderGraph() : <Svg>{renderGraph()}</Svg>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    overflow: 'hidden',
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

  dailyHoursView: {
    paddingTop: 8,
    paddingLeft: 8,
  },

  dailyHoursText: {
    fontSize: 15,
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
  hoursView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});

interface AttendanceDailyChartComponentProps {
  graphLeaveData: LeaveTypeGraphData[];
  graphWorkData: GraphDataPoint[];
  dateOfMonth: string[];
}

export default AttendanceDailyChartComponent;
