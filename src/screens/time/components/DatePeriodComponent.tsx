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
import FormattedDate from 'components/FormatedDate';
import Chip from 'components/DefaultChip';

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

          <Chip
            style={[
              styles.alignItemsCenter,
              {
                backgroundColor: theme.palette.backgroundSecondary,
                padding: theme.spacing * 3,
              },
            ]}>
            <Text
              style={[
                styles.textBold,
                {
                  color: theme.palette.secondary,
                },
              ]}>
              <FormattedDate style={{color: theme.palette.secondary}}>
                {convertDateObjectToStringFormat(
                  props.startDate,
                  'ddd, DD MMM YYYY',
                )}
              </FormattedDate>{' '}
              {'to'}{' '}
              <FormattedDate style={{color: theme.palette.secondary}}>
                {convertDateObjectToStringFormat(
                  props.endDate,
                  'ddd, DD MMM YYYY',
                )}
              </FormattedDate>
            </Text>
          </Chip>
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
  alignItemsCenter: {
    alignItems: 'center',
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
