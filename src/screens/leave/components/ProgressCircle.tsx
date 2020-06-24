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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {VictoryPie, VictoryLabel} from 'victory-native';
import Svg, {Circle} from 'react-native-svg';

class ProgressCircle extends React.Component<ProgressCircleProps> {
  render() {
    const {
      theme,
      height = 200,
      mainColor = '#bdbdbd',
      lightColor = '#ececec',
      usedDays = '0.00',
      progress = 0,
    } = this.props;

    const fontColor = theme.typography.primaryColor;
    const backgroundColor = theme.palette.background;
    const ratio = 400 / height;
    const fontSize = theme.typography.fontSize * ratio;
    const headerFontSize = theme.typography.headerFontSize * ratio;
    const data = [
      {x: 1, y: progress},
      {x: 2, y: 1 - progress},
    ];

    return (
      <>
        <View style={[styles.container, {height, backgroundColor}]}>
          <Svg viewBox="0 0 400 400" width="100%" height="100%">
            <Circle cx="200" cy="200" r="150" fill={lightColor} />
            <Circle cx="200" cy="200" r="120" fill={backgroundColor} />
            <VictoryPie
              standalone={false}
              animate={{duration: 500}}
              width={400}
              height={400}
              data={data}
              innerRadius={120}
              cornerRadius={theme.borderRadius * 4}
              labels={() => null}
              style={{
                data: {
                  fill: ({datum}) => {
                    return datum.x === 1 ? mainColor : 'transparent';
                  },
                },
              }}
            />
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={150}
              text={'Used'}
              style={{fontSize: fontSize, fill: fontColor}}
            />
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={200}
              text={usedDays}
              style={{fontSize: headerFontSize, fill: fontColor}}
            />
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={250}
              text={'Day(s)'}
              style={{fontSize: fontSize, fill: fontColor}}
            />
          </Svg>
        </View>
      </>
    );
  }
}

interface ProgressCircleProps extends WithTheme {
  marginHorizontal?: number;
  height?: number;
  mainColor?: string;
  lightColor?: string;
  usedDays?: string;
  progress?: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default withTheme<ProgressCircleProps>()(ProgressCircle);
