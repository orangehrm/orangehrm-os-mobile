/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
 */
import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  ModalProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import Spinner from 'components/DefaultSpinner';
import Text from 'components/DefaultText';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

const DefaultOverlay = (
  props: React.PropsWithChildren<DefaultOverlayProps>,
) => {
  const {modalProps, children, text, textStyle, theme} = props;
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent {...modalProps}>
        <View style={styles.container}>
          <View style={styles.background}>
            {children === undefined ? <Spinner /> : children}
            <View style={[styles.textContainer]}>
              {text === undefined ? null : (
                <Text style={[{top: theme.spacing * 10}, textStyle]}>
                  {text}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

interface DefaultOverlayProps extends WithTheme {
  modalProps: ModalProps;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  container: {
    backgroundColor: 'transparent',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default withTheme<DefaultOverlayProps>()(DefaultOverlay);
