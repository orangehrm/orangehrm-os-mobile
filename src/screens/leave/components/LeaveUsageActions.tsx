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
import {StyleSheet, View, ViewProps} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import CardButton from 'screens/leave/components/CardButton';
import Icon from 'components/DefaultIcon';
import {MY_LEAVE} from 'screens';
import {navigate} from 'lib/helpers/navigation';

class LeaveUsageActions extends React.Component<LeaveUsageActionsProps> {
  onPressMyLeave = () => {
    navigate(MY_LEAVE);
  };

  render() {
    const {theme, style} = this.props;

    return (
      <>
        <View
          style={[
            {
              paddingHorizontal: theme.spacing * 5,
              paddingBottom: theme.spacing * 6,
            },
            style,
          ]}>
          <CardButton onPress={this.onPressMyLeave}>
            <View style={styles.cardButtonContent}>
              <View style={styles.buttonLeftView}>
                <Icon name={'history'} />
                <Text style={{paddingTop: theme.spacing * 0.5}}>
                  {'My Leave'}
                </Text>
              </View>
              <Icon name={'chevron-right'} />
            </View>
          </CardButton>
        </View>
      </>
    );
  }
}

interface LeaveUsageActionsProps extends WithTheme, Pick<ViewProps, 'style'> {}

const styles = StyleSheet.create({
  buttonLeftView: {
    flexDirection: 'row',
  },
  cardButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
});

export default withTheme<LeaveUsageActionsProps>()(LeaveUsageActions);
