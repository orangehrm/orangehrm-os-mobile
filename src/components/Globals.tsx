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
import {Toast} from 'native-base';
import withGlobals, {WithGlobals} from 'lib/hoc/withGlobals';
import Overlay from 'components/DefaultOverlay';

const Globals = (props: GlobalsProps) => {
  const [toastShow, setToastShow] = useState(false);
  const {loader, snackMessage, closeSnackMessage} = props;
  useEffect(() => {
    if (!toastShow) {
      if (snackMessage.open) {
        Toast.show({
          text: snackMessage.message,
          // TODO: set duration
          duration: 2000,
          onClose: () => {
            closeSnackMessage();
            setToastShow(false);
          },
        });
        setToastShow(true);
      }
    }
  }, [toastShow, snackMessage, closeSnackMessage]);
  return (
    <>
      <Overlay modalProps={{visible: loader.open}}>{loader.content}</Overlay>
    </>
  );
};

interface GlobalsProps extends WithGlobals {}

export default withGlobals<GlobalsProps>()(Globals);
