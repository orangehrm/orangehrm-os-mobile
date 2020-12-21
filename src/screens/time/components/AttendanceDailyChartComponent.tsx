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

  const renderGraph = () => {
    return (
      <View
        style={[
          styles.flexOne,
          {
            backgroundColor: theme.palette.backgroundSecondary,
            padding: theme.spacing * 2.5,
          },
        ]}>
        <CardContent
          style={{
            paddingTop: theme.spacing * 2,
            paddingHorizontal: theme.spacing * 3,
            backgroundColor: theme.palette.background,
            borderRadius: theme.spacing * 5,
          }}>
          <View
            style={{
              paddingTop: theme.spacing * 2,
              paddingLeft: theme.spacing * 2,
            }}>
            <Text style={{fontSize: theme.spacing * 3.75}}>
              {'Daily Hours'}
            </Text>
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
                    const tickValue = datum.ticks[datum.index];
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
        </CardContent>
      </View>
    );
  };

  return (
    <View>
      {Platform.OS === 'ios' ? renderGraph() : <Svg>{renderGraph()}</Svg>}
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

interface AttendanceDailyChartComponentProps {
  graphLeaveData: LeaveTypeGraphData[];
  graphWorkData: GraphDataPoint[];
  dateOfMonth: string[];
}

export default AttendanceDailyChartComponent;
