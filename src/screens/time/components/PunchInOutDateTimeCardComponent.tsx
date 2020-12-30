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
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect} from 'react-redux';
import Card from 'components/DefaultCard';
import CardContent from 'components/DefaultCardContent';
import Text from 'components/DefaultText';
import {fetchPunchStatus} from 'store/time/punch/actions';
import {formatTime} from 'lib/helpers/attendance';
import FormattedDate from 'components/FormatedDate';

const PunchInOutDateTimeCard = (props: PunchInOutDateTimeCardProps) => {
  const {theme, punchCurrentDateTime} = props;

  let date;
  if (punchCurrentDateTime === undefined) {
    date = new Date();
  } else {
    date = punchCurrentDateTime;
  }

  const dateDisplay = date.toDateString();
  const timeDisplay = formatTime(date);
  return (
    <>
      <View
        style={{
          paddingHorizontal: theme.spacing * 5,
          paddingBottom: theme.spacing * 4,
        }}>
        <Card
          fullWidth
          style={{
            borderRadius: theme.borderRadius * 2,
          }}>
          <CardContent
            style={{
              paddingTop: theme.spacing * 2,
              paddingHorizontal: theme.spacing * 3,
            }}>
            <View
              style={[
                styles.rowFlexDirection,
                styles.justifyContentCenter,
                {
                  paddingTop: theme.spacing * 4,
                },
              ]}>
              <FormattedDate
                style={{
                  color: theme.typography.primaryColor,
                  fontSize: theme.spacing * 5,
                }}>
                {dateDisplay}
              </FormattedDate>
            </View>
            <View
              style={[
                styles.rowFlexDirection,
                styles.justifyContentCenter,
                {paddingBottom: theme.spacing * 6},
              ]}>
              <Text
                bold
                style={{
                  color: theme.typography.primaryColor,
                  fontSize: theme.typography.headerFontSize * 2,
                }}>
                {timeDisplay.substring(0, timeDisplay.length - 2)}
              </Text>
              <View style={styles.amPmTextView}>
                <Text
                  bold
                  style={{
                    color: theme.typography.primaryColor,
                    fontSize: theme.typography.subHeaderFontSize,
                    marginBottom: theme.spacing,
                  }}>
                  {timeDisplay
                    .substring(timeDisplay.length - 2, timeDisplay.length)
                    .toUpperCase()}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </>
  );
};

interface PunchInOutDateTimeCardProps extends WithTheme {
  punchCurrentDateTime?: Date;
}

const styles = StyleSheet.create({
  validPeriodText: {
    alignItems: 'center',
  },
  totalEntitlementView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipView: {
    alignItems: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },

  alignItemsFlexEnd: {
    alignItems: 'flex-end',
  },

  rowFlexDirection: {
    flexDirection: 'row',
  },
  amPmTextView: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

const mapDispatchToProps = {
  fetchPunchStatus,
};

const connector = connect(null, mapDispatchToProps);

const PunchInOutDateTimeCardWithTheme = withTheme<PunchInOutDateTimeCardProps>()(
  PunchInOutDateTimeCard,
);

export default connector(PunchInOutDateTimeCardWithTheme);
