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

import React, {useEffect, useState} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Text from './DefaultText';
import {setItem} from 'store/storage/actions';
import {RootState} from 'store';
import {selectMyInfo} from '../store/auth/selectors';
import {connect} from 'react-redux';
import {WARNING_MODAL_STATUS} from 'services/storage';

const WarningModule = (props: React.PropsWithChildren<WarningModuleProps>) => {
  const {isVisible, ...modalProps} = props;
  const [isVisibleModule, setModelVisible] = useState(isVisible);

  useEffect(() => {
    setModelVisible(isVisible);
  }, [isVisible]);

  const onPressAcknowledge = () => {
    const {storageSetItem} = props;
    storageSetItem(WARNING_MODAL_STATUS, JSON.stringify('true'));
    setModelVisible(false);
  };

  return (
    <Modal
      useNativeDriver={true}
      isVisible={isVisibleModule}
      backdropOpacity={0.25}
      {...modalProps}>
      <View style={styles.mainView}>
        <View style={styles.subView}>
          <Icon
            type="MaterialIcons"
            name={'notification-important'}
            style={styles.iconStyle}
          />
          <Text style={styles.title}>Stay Up-to-date</Text>
          <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>
              OrangeHRM's open-source mobile application will no longer be
              supported for versions 4.x. The April 2023 release will only
              provide support for version 5.x of the mobile application.
            </Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              onPress={onPressAcknowledge}
              style={styles.btnTextView}>
              <Text style={styles.btnText}>Acknowledge</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    width: '85%',
    height: '66%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 8,
    paddingTop: 20,
  },
  descriptionView: {
    width: '90%',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  iconStyle: {
    color: '#f88400',
    fontSize: 45,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    paddingTop: 15,
  },
  btnView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '18%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextView: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    color: '#f88400',
    fontSize: 16,
  },
});

const mapStateToProps = (state: RootState) => ({
  myInfo: selectMyInfo(state),
});

const mapDispatchToProps = {
  storageSetItem: setItem,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export interface WarningModuleProps extends Partial<ModalProps> {}

export default connector(WarningModule);
