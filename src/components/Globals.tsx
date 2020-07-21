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

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Overlay from 'components/DefaultOverlay';
import SnackDialog from 'components/SnackDialog';
import Text from 'components/DefaultText';
import Icon, {IconProps} from 'components/DefaultIcon';
import {
  TYPE_SUCCESS,
  TYPE_ERROR,
  TYPE_INFO,
  TYPE_WARN,
} from 'store/globals/types';
import {$PropertyType} from 'utility-types';
import useGlobals from 'lib/hook/useGlobals';
import useTheme from 'lib/hook/useTheme';

const ICON_MAP = {
  [TYPE_SUCCESS]: {
    name: 'checkbox-marked-circle-outline',
    type: 'MaterialCommunityIcons',
  },
  [TYPE_ERROR]: {name: 'error-outline', type: 'MaterialIcons'},
  [TYPE_INFO]: {name: 'info-outline', type: 'MaterialIcons'},
  [TYPE_WARN]: {name: 'alert-outline', type: 'MaterialCommunityIcons'},
};

const Globals = () => {
  const [toastShow, setToastShow] = useState(false);
  const {loader, snackMessage, closeSnackMessage} = useGlobals();
  const theme = useTheme();
  useEffect(() => {
    if (!toastShow) {
      if (snackMessage.open && snackMessage.type !== TYPE_ERROR) {
        setTimeout(() => {
          closeSnackMessage();
          setToastShow(false);
        }, 3000);
        setToastShow(true);
      }
    }
  }, [toastShow, snackMessage, closeSnackMessage]);
  return (
    <>
      <Overlay modalProps={{visible: loader.open}}>{loader.content}</Overlay>
      <SnackDialog
        isVisible={snackMessage.open}
        closeSnackMessage={closeSnackMessage}
        viewProps={{
          style: snackMessage.type
            ? {backgroundColor: theme.palette[snackMessage.type]}
            : undefined,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            closeSnackMessage();
            setToastShow(false);
          }}>
          <View style={[styles.snackView, {padding: theme.spacing * 4}]}>
            {snackMessage.type ? (
              <View style={styles.iconView}>
                <Icon
                  name={ICON_MAP[snackMessage.type].name}
                  type={
                    ICON_MAP[snackMessage.type].type as $PropertyType<
                      IconProps,
                      'type'
                    >
                  }
                  style={{color: theme.typography.lightColor}}
                />
              </View>
            ) : null}
            <View
              style={{
                paddingLeft: theme.spacing * 3,
                paddingRight: theme.spacing * 5,
                paddingTop: theme.spacing * 0.5,
              }}>
              <Text
                style={{
                  color: theme.typography.lightColor,
                }}>
                {snackMessage.message}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </SnackDialog>
    </>
  );
};

const styles = StyleSheet.create({
  snackView: {
    flexDirection: 'row',
  },
  iconView: {
    justifyContent: 'center',
  },
});

export default Globals;
