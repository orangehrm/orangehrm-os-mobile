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
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Fab, NativeBase} from 'native-base';
import Icon from 'components/DefaultIcon';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

const DefaultFab = (props: DefaultFabProps) => {
  const {iconName, primary, secondary, theme, style, ...restProps} = props;
  let color: string | undefined = theme.palette.default;
  if (primary) {
    color = theme.palette.primary;
  } else if (secondary) {
    color = theme.palette.secondary;
  }

  return (
    <SafeAreaView>
      <Fab
        containerStyle={{bottom: theme.spacing * 4, right: theme.spacing * 5}}
        style={[{backgroundColor: color}, style]}
        position="bottomRight"
        {...restProps}>
        <Icon name={iconName} />
      </Fab>
    </SafeAreaView>
  );
};

interface DefaultFabProps extends NativeBase.Fab, WithTheme {
  iconName: string;
  primary?: boolean;
  secondary?: boolean;
}

export default withTheme<DefaultFabProps>()(DefaultFab);

export const FabSpace = () => {
  return <View style={styles.fabSpace} />;
};

const styles = StyleSheet.create({
  fabSpace: {
    // Fab width = height = 56
    padding: 28,
  },
});
