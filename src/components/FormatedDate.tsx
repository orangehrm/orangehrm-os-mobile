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
import moment from 'moment';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectDateFormat} from 'store/storage/selectors';
import Text, {DefaultTextProps as TextProps} from 'components/DefaultText';
import {DEFAULT_DATE_FORMAT} from 'lib/helpers/date';

/**
 * This component can use within Text
 * https://reactnative.dev/docs/text#nested-text
 * e.g. <Text><Date>{'2020-01-01' ?? '- -'}</Date></Text>
 * @param props
 */
const FormattedDate = (props: FormattedDateProps) => {
  const {children = null, dateFormat, ...restProps} = props;

  let formattedDate = children;
  if (typeof children === 'string' || (children as any) instanceof String) {
    const date = moment(children);
    formattedDate = date.isValid()
      ? date.format(dateFormat ?? DEFAULT_DATE_FORMAT)
      : children;
  }

  return <Text {...restProps}>{formattedDate}</Text>;
};

interface FormattedDateProps
  extends TextProps,
    ConnectedProps<typeof connector> {
  children?: string | null;
}

const mapStateToProps = (state: RootState) => ({
  dateFormat: selectDateFormat(state),
});

const connector = connect(mapStateToProps);

export default connector(FormattedDate);
