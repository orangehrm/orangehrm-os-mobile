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
import FormattedDate from 'components/FormattedDate';
import Chip from 'components/DefaultChip';
import {Moment} from 'moment';

const DatePeriodComponent = (props: DatePeriodComponentProps) => {
  const theme = useTheme();
  const {onPressLeft, onPressRight, rightActive} = props;
  return (
    <>
      <View
        style={[
          styles.mainView,
          {
            paddingVertical: theme.spacing * 2.5,
            paddingHorizontal: theme.spacing * 5,
            backgroundColor: theme.palette.background,
          },
        ]}>
        <View>
          <Text bold>{'Date Period'}</Text>
        </View>
        <View
          style={[
            styles.rowFlexDirection,
            styles.justifyContentSpaceBetween,
            {
              paddingVertical: theme.spacing * 2.5,
            },
          ]}>
          <View style={styles.leftArrow}>
            <IconButton
              iconProps={{
                name: 'chevron-left',
                style: {
                  marginRight: theme.spacing * 0.5,
                  marginLeft: theme.spacing,
                  fontSize: theme.typography.iconSize * 1.5,
                },
              }}
              buttonProps={{onPress: onPressLeft}}
            />
          </View>
          <View style={styles.chipView}>
            <Chip
              style={{
                backgroundColor: theme.palette.backgroundSecondary,
                paddingHorizontal: theme.spacing * 3,
                padding: theme.spacing * 3,
              }}>
              <Text
                bold
                style={{
                  color: theme.palette.secondary,
                  fontSize: theme.typography.fontSize,
                }}>
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
          </View>
          <View>
            <IconButton
              iconProps={{
                name: 'chevron-right',
                style: {
                  color: rightActive
                    ? theme.typography.primaryColor
                    : theme.typography.secondaryColor,
                  marginLeft: theme.spacing * 0.5,
                  marginRight: theme.spacing,
                  fontSize: theme.typography.iconSize * 1.5,
                },
              }}
              buttonProps={{onPress: onPressRight, disabled: !rightActive}}
            />
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
  },
  leftArrow: {
    flexWrap: 'wrap-reverse',
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  chipView: {
    alignItems: 'center',
  },
});
interface DatePeriodComponentProps {
  onPressRight: () => void;
  onPressLeft: () => void;
  rightActive: boolean;
  leftActive: boolean;
  startDate: Moment;
  endDate: Moment;
}
export default DatePeriodComponent;
