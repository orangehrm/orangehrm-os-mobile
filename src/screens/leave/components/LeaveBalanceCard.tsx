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
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import Text from 'components/DefaultText';
import Chip from 'components/DefaultChip';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

class LeaveBalanceCard extends React.Component<LeaveBalanceCardProps> {
  render() {
    const {
      theme,
      leaveType,
      leaveBalance,
      selected = false,
      selectedColor = '#bdbdbd',
      onPress,
    } = this.props;
    return (
      <>
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[
              styles.card,
              {
                padding: theme.spacing * 2,
                paddingBottom: theme.spacing * 4,
                borderRadius: theme.borderRadius * 2,
              },
              selected ? {backgroundColor: selectedColor} : undefined,
            ]}>
            <Chip
              fullWidth
              style={[
                styles.chip,
                {
                  paddingVertical: theme.spacing * 0.5,
                  paddingHorizontal: theme.spacing * 2,
                  marginVertical: theme.spacing * 2,
                },
                selected ? undefined : {backgroundColor: selectedColor},
              ]}>
              <Text
                numberOfLines={1}
                style={[
                  {fontSize: theme.typography.smallFontSize},
                  selected
                    ? {color: theme.typography.darkColor}
                    : {color: theme.typography.lightColor},
                ]}>
                {leaveType}
              </Text>
            </Chip>
            <Text
              style={[
                {fontSize: theme.typography.headerFontSize},
                selected
                  ? {color: theme.typography.lightColor}
                  : {color: theme.typography.darkColor},
              ]}>
              {leaveBalance}
            </Text>
            <Text
              style={[
                {fontSize: theme.typography.smallFontSize},
                selected
                  ? {color: theme.typography.lightColor}
                  : {color: theme.typography.darkColor},
              ]}>
              {'Days Available'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

interface LeaveBalanceCardProps
  extends WithTheme,
    Pick<TouchableWithoutFeedbackProps, 'onPress'> {
  leaveType: string;
  leaveBalance: string;
  selected?: boolean;
  selectedColor?: string;
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 100,
    backgroundColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    alignItems: 'center',
  },
});

export default withTheme<LeaveBalanceCardProps>()(LeaveBalanceCard);
