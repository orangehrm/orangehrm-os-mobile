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
import Dialog, {DialogProps} from 'components/DefaultDialog';

const BottomDialog = (props: React.PropsWithChildren<BottomDialogProps>) => {
  const {theme, children, isVisible, onCancel, ...dialogProps} = props;

  return (
    <Dialog
      isVisible={isVisible}
      {...dialogProps}
      style={styles.dialog}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}>
      <View style={{backgroundColor: theme.palette.background}}>
        {children}
      </View>
    </Dialog>
  );
};

interface BottomDialogProps extends WithTheme, DialogProps {
  onCancel?: () => void;
}

const styles = StyleSheet.create({
  dialog: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default withTheme<BottomDialogProps>()(BottomDialog);
