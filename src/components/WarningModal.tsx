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
import Modal, {ModalProps} from 'react-native-modal';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {Icon} from 'native-base';
import Text from './DefaultText';
import {setItem} from 'store/storage/actions';
import {RootState} from 'store';
import {selectMyInfo} from 'store/auth/selectors';
import {connect} from 'react-redux';
import {WARNING_MODAL_STATUS} from 'services/storage';

const WarningModal = (props: React.PropsWithChildren<WarningModalProps>) => {
  const {isVisible, storageSetItem} = props;

  const onPressAcknowledge = () => {
    storageSetItem(WARNING_MODAL_STATUS, 'true');
  };

  return (
    <Modal
      useNativeDriver={false}
      isVisible={isVisible}
      backdropOpacity={0.25}
      coverScreen={false}
      hideModalContentWhileAnimating>
      <SafeAreaView>
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
                Starting with the April 2023 release, this app will no longer
                provide support for OrangeHRM Open Source 4x versions. Instead,
                the updated app will only cater to 5.4 version and onwards.
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
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    width: '85%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 8,
    paddingTop: 20,
  },
  descriptionView: {
    width: '90%',
    height: 'auto',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 60,
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
    width: '100%',
    height: 'auto',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextView: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
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

export interface WarningModalProps extends Partial<ModalProps> {}

export default connector(WarningModal);
