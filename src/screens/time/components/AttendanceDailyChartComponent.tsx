import React from 'react';
import {View, Platform, Text} from 'react-native';
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
import Card from 'components/DefaultCard';
import {getWeekdayOrder} from 'lib/helpers/attendance';

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
      <View style={{backgroundColor: theme.palette.background}}>
        <VictoryChart domainPadding={theme.spacing * 3.75}>
          <VictoryAxis
            dependentAxis
            style={{
              axis: {stroke: theme.palette.background},
              grid: {stroke: theme.palette.default},
              ticks: {
                stroke: theme.palette.default,
                fontSize: theme.typography.fontSize,
              },
              tickLabels: {
                fontSize: theme.typography.tinyFontSize,
                padding: theme.spacing,
              },
            }}
            tickLabelComponent={
              <VictoryLabel
                text={(datum) => {
                  const tickValue = datum.ticks[datum.index];
                  if (Number.isInteger(tickValue)) {
                    return tickValue + ' Hrs';
                  } else {
                    const maxLeaveYPoint =
                      props.graphLeaveData.length > 0
                        ? props.graphLeaveData
                            .map((singleType) => {
                              const maxx = singleType.data
                                .map((dataPoint) => {
                                  return dataPoint.y;
                                })
                                .reduce(function (previous, current) {
                                  return previous > current
                                    ? previous
                                    : current;
                                });
                              return maxx;
                            })
                            .reduce(function (previous, current) {
                              return previous > current ? previous : current;
                            })
                        : 0;
                    const maxWorkYPoint =
                      props.graphWorkData.length > 0
                        ? props.graphWorkData
                            .map((dataPoint) => {
                              return dataPoint.y;
                            })
                            .reduce(function (previous, current) {
                              return previous > current ? previous : current;
                            })
                        : 0;
                    const maxYPoint =
                      maxWorkYPoint > maxLeaveYPoint
                        ? maxWorkYPoint
                        : maxLeaveYPoint;
                    if (maxYPoint < 1 && maxYPoint > 0) {
                      return tickValue + ' Hrs';
                    } else {
                      return '';
                    }
                  }
                }}
              />
            }
          />
          <VictoryAxis
            style={{
              grid: {stroke: theme.palette.background},
              ticks: {
                stroke: theme.palette.default,
                fontSize: theme.typography.fontSize,
              },
              tickLabels: {
                fontSize: theme.typography.tinyFontSize,
                padding: theme.spacing * 1.5,
              },
            }}
            tickFormat={getWeekdayOrder(props.weekStartDayIndex, 'dd')}
          />
          <VictoryAxis
            style={{
              grid: {stroke: theme.palette.background},
              ticks: {
                stroke: theme.palette.default,
                fontSize: theme.typography.fontSize,
              },
              tickLabels: {
                fontSize: theme.typography.tinyFontSize,
                padding: theme.spacing * 5,
              },
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
    <View style={{paddingHorizontal: theme.spacing * 3}}>
      <Card
        style={{
          backgroundColor: theme.palette.background,
          borderRadius: theme.borderRadius * 2,
        }}>
        <CardContent
          style={{
            paddingTop: theme.spacing * 2,
            backgroundColor: theme.palette.background,
            borderRadius: theme.borderRadius * 2,
          }}>
          <View
            style={{
              paddingTop: theme.spacing * 2,
              paddingLeft: theme.spacing * 5,
            }}>
            <Text style={{fontSize: theme.typography.subHeaderFontSize}}>
              {'Daily Hours'}
            </Text>
          </View>
          {/* https://github.com/FormidableLabs/victory-native/issues/96 */}
          {Platform.OS === 'ios' ? renderGraph() : <Svg>{renderGraph()}</Svg>}
        </CardContent>
      </Card>
    </View>
  );
};

interface AttendanceDailyChartComponentProps {
  graphLeaveData: LeaveTypeGraphData[];
  graphWorkData: GraphDataPoint[];
  dateOfMonth: string[];
  onPressBar: (day: ShortDay) => void;
  weekStartDayIndex: number;
}

export default AttendanceDailyChartComponent;
