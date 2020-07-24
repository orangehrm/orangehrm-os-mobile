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
import Text from 'components/DefaultText';
import CardButton, {CardButtonProps} from 'screens/leave/components/CardButton';
import Icon from 'components/DefaultIcon';

const FlatButton = (props: FlatButtonProps) => {
  const {
    theme,
    text,
    error,
    icon,
    rightIcon = true,
    elevation = false,
    ...restProps
  } = props;

  return (
    <>
      <CardButton
        style={[
          styles.cardButton,
          elevation ? undefined : styles.cardButtonElevation,
          {height: theme.spacing * 12},
        ]}
        {...restProps}>
        <View style={[styles.cardButtonContent]}>
          <View style={styles.buttonLeftView}>
            {icon ? <Icon name={icon} /> : null}
            <Text
              style={[
                {paddingTop: theme.spacing * 0.5},
                icon ? undefined : {marginLeft: theme.spacing * 4},
              ]}>
              {text}
            </Text>
          </View>
          <Text style={{paddingTop: theme.spacing * 0.5}}>{error}</Text>
          {rightIcon ? <Icon name={'chevron-right'} /> : null}
        </View>
      </CardButton>
    </>
  );
};

interface FlatButtonProps extends Omit<CardButtonProps, 'icon'>, WithTheme {
  text: string;
  error?: string;
  icon?: string;
  rightIcon?: boolean;
  elevation?: boolean;
}

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
  cardButton: {
    borderRadius: 0,
  },
  cardButtonElevation: {
    elevation: 0,
  },
});

export default withTheme<FlatButtonProps>()(FlatButton);
