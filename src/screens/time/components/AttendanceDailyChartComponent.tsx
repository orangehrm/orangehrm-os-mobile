import React from 'react';
import {View, Platform, Text, StyleSheet} from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
} from 'victory-native';
import {VictoryBarProps} from 'victory-bar';
import Svg from 'react-native-svg';
import {
  GraphDataPoint,
  LeaveTypeGraphData,
  ShortDay,
} from 'store/time/attendance/types';
import useTheme from 'lib/hook/useTheme';
import CardContent from 'components/DefaultCardContent';
import {$PropertyType} from 'utility-types';

const AttendanceDailyChartComponent = (
  props: AttendanceDailyChartComponentProps,
) => {
  const theme = useTheme();

  const events: $PropertyType<VictoryBarProps, 'events'> = [
    {
      childName: 'all',
      target: 'data',
      eventHandlers: {
        onPressIn: () => {
          return [
            {
              target: 'data',
              mutation: (properties) => {
                props.onPressBar(properties.datum.x);
              },
            },
          ];
        },
      },
    },
  ];

  const renderGraph = () => {
    return (
      <View>
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

          <VictoryStack>
            <VictoryBar
              style={{data: {fill: theme.palette.secondary}}}
              data={props.graphWorkData}
              events={events}
            />
            {props.graphLeaveData.map((leaveTypeData, index) => {
              return (
                <VictoryBar
                  key={index}
                  style={{data: {fill: leaveTypeData.colour}}}
                  data={leaveTypeData.data}
                  events={events}
                />
              );
            })}
          </VictoryStack>
        </VictoryChart>
      </View>
    );
  };

  return (
    <View>
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
          {/* https://github.com/FormidableLabs/victory-native/issues/96 */}
          {Platform.OS === 'ios' ? renderGraph() : <Svg>{renderGraph()}</Svg>}
        </CardContent>
      </View>
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
  onPressBar: (day: ShortDay) => void;
}

export default AttendanceDailyChartComponent;
