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
import {
  StyleSheet,
  View,
  ViewProps,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import FlatButton from 'screens/leave/components/FlatButton';
import {Subordinate} from 'store/leave/assign-leave/types';
import {navigate} from 'lib/helpers/navigation';
import {PICK_EMPLOYEE} from 'screens';
import {PickEmployeeParams} from 'screens/leave/navigators';
import {PickEmployeeTextInput} from 'screens/leave/PickEmployee';
import {getFirstAndLastNames} from 'lib/helpers/name';

class PickSubordinate extends React.Component<
  PickSubordinateProps,
  PickSubordinateState
> {
  inputRef: RNTextInput | null;

  constructor(props: PickSubordinateProps) {
    super(props);
    this.inputRef = null;
    this.state = {
      textValue: '',
    };
  }

  componentDidMount() {
    const {selectedSubordinate} = this.props;
    this.updateSubordinate(selectedSubordinate);
  }

  componentDidUpdate(prevProps: PickSubordinateProps) {
    const {selectedSubordinate} = this.props;
    const {textValue} = this.state;
    if (prevProps.selectedSubordinate !== selectedSubordinate) {
      this.updateSubordinate(selectedSubordinate);
    } else if (
      selectedSubordinate &&
      textValue !== getFirstAndLastNames(selectedSubordinate)
    ) {
      //update only text field name
      this.updateSubordinate(selectedSubordinate);
    }
  }

  updateSubordinate = (subordinate?: Subordinate) => {
    if (subordinate) {
      this.setState({
        textValue: getFirstAndLastNames(subordinate),
      });
    }
  };

  onPressEmployee = () => {
    if (this.inputRef?.isFocused()) {
      this.inputRef?.blur();
    } else {
      this.inputRef?.focus();
    }
  };

  onFocus = () => {
    const {subordinates, onRefreshSubordinate} = this.props;
    const {textValue} = this.state;
    navigate<PickEmployeeParams>(PICK_EMPLOYEE, {
      employees: subordinates,
      textValue,
      setTextValue: (text) => {
        this.setState({textValue: text});
      },
      pickEmployee: this.pickSubordinate,
      onRefresh: onRefreshSubordinate,
    });
  };

  pickSubordinate = (subordinate: Subordinate) => {
    this.props.setSelectedSubordinate(subordinate);
    this.inputRef?.blur();
  };

  render() {
    const {theme, style, subordinates, selectedSubordinate} = this.props;
    const {textValue} = this.state;
    return (
      <View style={style}>
        <FlatButton
          text={'Employee'}
          icon={'account'}
          rightIcon={false}
          elevation
          onPress={this.onPressEmployee}
        />
        <View
          style={[
            {
              paddingRight: theme.spacing * 6,
              paddingLeft: theme.spacing * 12,
              backgroundColor: theme.palette.background,
            },
            styles.marginForShadow,
          ]}>
          {subordinates ? (
            <TouchableWithoutFeedback onPress={this.onPressEmployee}>
              <View style={styles.textInputView}>
                <View style={styles.fullName}>
                  <PickEmployeeTextInput
                    ref={(input) => {
                      this.inputRef = input;
                    }}
                    onFocus={this.onFocus}
                    value={textValue}
                    onChangeText={(text: string) => {
                      this.setState({textValue: text});
                    }}
                    multiline={Platform.OS !== 'ios'}
                    style={{
                      ...Platform.select({
                        ios: {
                          marginVertical: theme.spacing * 4,
                        },
                      }),
                    }}
                  />
                </View>
                {selectedSubordinate !== undefined ? (
                  <Text
                    style={[
                      {paddingVertical: theme.spacing * 4},
                      styles.employeeId,
                    ]}>
                    {selectedSubordinate.employeeId}
                  </Text>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </View>
    );
  }
}

interface PickSubordinateProps extends WithTheme, Pick<ViewProps, 'style'> {
  subordinates?: Subordinate[];
  selectedSubordinate?: Subordinate;
  setSelectedSubordinate: (subordinate: Subordinate) => void;
  onRefreshSubordinate: () => void;
}

interface PickSubordinateState {
  textValue: string;
}

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  fullName: {
    flex: 5,
  },
  employeeId: {
    flex: 1,
    textAlign: 'right',
  },
  marginForShadow: {
    ...Platform.select({
      ios: {
        marginTop: 2,
      },
    }),
  },
});

export default withTheme<PickSubordinateProps>()(PickSubordinate);
