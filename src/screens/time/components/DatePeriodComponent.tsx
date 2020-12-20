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
import {StyleSheet, View} from 'react-native';
import useTheme from 'lib/hook/useTheme';
import Text from 'components/DefaultText';
import IconButton from 'components/DefaultIconButton';
import {convertDateObjectToStringFormat} from 'lib/helpers/attendance';

const DatePeriodComponent = (props: DatePeriodComponentProps) => {
  const theme = useTheme();
  const {onPressLeft, onPressRight, rightActive} = props;
  return (
    <>
      <View
        style={[
          styles.mainView,
          {
            paddingHorizontal: theme.spacing * 5,
            paddingVertical: theme.spacing * 2.5,
            backgroundColor: theme.palette.background,
          },
        ]}>
        <View>
          <Text style={[styles.textBold]}>{'Date Period'}</Text>
        </View>
        <View
          style={[
            styles.rowFlexDirection,
            styles.justifyContentSpaceBetween,
            {
              paddingVertical: theme.spacing * 2.5,
            },
          ]}>
          <View>
            <IconButton
              iconProps={{name: 'chevron-left'}}
              buttonProps={{onPress: onPressLeft}}
            />
          </View>

          <View
            style={[
              {
                paddingHorizontal: theme.spacing * 2.5,
                borderRadius: theme.spacing * 2.5,
                backgroundColor: theme.palette.backgroundSecondary,
              },
            ]}>
            <Text
              style={[
                styles.textBold,
                {
                  color: theme.palette.secondary,
                  fontSize: theme.spacing * 4,
                  paddingVertical: theme.spacing,
                },
              ]}>
              {convertDateObjectToStringFormat(
                props.startDate,
                'ddd, DD MMM YYYY',
              )}{' '}
              {'to'}{' '}
              {convertDateObjectToStringFormat(
                props.endDate,
                'ddd, DD MMM YYYY',
              )}
            </Text>
          </View>
          <IconButton
            iconProps={{
              name: 'chevron-right',
              style: {
                color: rightActive
                  ? theme.typography.darkColor
                  : theme.typography.secondaryColor,
              },
            }}
            buttonProps={{onPress: onPressRight, disabled: !rightActive}}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
  },

  noRecordsText: {
    textAlign: 'center',
  },

  textBold: {
    fontWeight: 'bold',
  },
  flexOne: {
    flex: 1,
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
});

interface DatePeriodComponentProps {
  onPressRight: () => void;
  onPressLeft: () => void;
  rightActive: boolean;
  leftActive: boolean;
  startDate: moment.Moment;
  endDate: moment.Moment;
}
export default DatePeriodComponent;
