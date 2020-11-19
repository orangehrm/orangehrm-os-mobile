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
import {View, StyleSheet, Platform, Alert,Keyboard, TextInput as RNTextInput} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {fetchPunchStatus, changePunchCurrentDateTime, setPunchNote} from 'store/time/attendance/actions';
import {selectPunchStatus, selectPunchCurrentDateTime, selectSavedPunchNote } from 'store/time/attendance/selectors';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import {navigate} from 'lib/helpers/navigation';
import CardButton from 'screens/leave/components/CardButton';
import Icon from 'components/DefaultIcon';
import EditPunchInOutDateTimeCard from 'screens/time/components/EditPunchInOutDateTimeCardComponent';
import PunchInOutDateTimeCard from 'screens/time/components/PunchInOutDateTimeCardComponent';
import NoteComponent from 'screens/time/components/NoteComponentPrev';
import PickNote , {PickNoteFooter}  from 'screens/time/components/NoteComponent';
import Card from 'components/DefaultCard';
import CardContent from 'components/DefaultCardContent';
import CardActions from 'components/DefaultCardActions';

class Punch extends React.Component<PunchProps, PunchState> {
  inputRef: RNTextInput | null;
  constructor(props: PunchProps) {
    super(props);
    this.inputRef = null;
    this.state = {
      typingNote: true,
      note: '',
    };
    props.fetchPunchStatus();
  }
  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', this.hideCommentInput);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this.hideCommentInput);
  }

  onRefresh = () => {
    this.props.fetchPunchStatus();
  };

  updateDateTime = (datetime : Date) => {
    this.props.changePunchCurrentDateTime(datetime);
  }

  setNote = (text: string) => {
    this.setState({
      note: text,
    });
  };
  toggleCommentInput = () => {
    if (this.state.typingNote === true) {
      this.hideCommentInput();
    } else {
      this.showCommentInput();
    }
  };

  onPressSubmitButton = () => {
    const {setPunchNote} = this.props;
    const {note} = this.state;
    setPunchNote(note);
    this.hideCommentInput();
  }

  showCommentInput = () => {
    this.setState({typingNote: true});
  };

  hideCommentInput = () => {
    this.setState({typingNote: false});
  };
  setLeaveComment = (text: string) => {
    this.setState({
      note: text,
    });
  };


  render() {
    const {theme ,punchStatus,punchCurrentDateTime, savedNote} = this.props;
    const {note} = this.state;
    const editable = true;
    return (
      <MainLayout onRefresh = {this.onRefresh}
      footer={              
      <View>
        {this.state.typingNote ? (
          <>
            <Divider />
            <PickNoteFooter
              ref={(input) => {
                this.inputRef = input;
              }}
              value={note}
              onChangeText={this.setLeaveComment}
              onPress={this.onPressSubmitButton}
            />
          </>
        ): null}
      </View>}> 
      
        <View style={{marginLeft: theme.spacing ,marginTop: theme.spacing * 5}}>
            
            {editable? (
              <>
              <EditPunchInOutDateTimeCard punchCurrentDateTime = {punchCurrentDateTime} updateDateTime = {this.updateDateTime} />
              </>
            ): <PunchInOutDateTimeCard punchCurrentDateTime = {punchCurrentDateTime}/> }
        </View>
              <View
                style={{
                  paddingHorizontal: theme.spacing * 5,
                  paddingBottom: theme.spacing * 4,
                }}>
                <Card
                  fullWidth
                  style={{
                    borderRadius: theme.borderRadius * 2,
                  }}
                  >
                  <CardContent
                    style={{
                      paddingTop: theme.spacing * 4,
                      paddingHorizontal: theme.spacing * 3,
                    }}>
                      <View 
                        style={[
                          styles.mainView,
                          {
                            paddingBottom: theme.spacing * 4,
                          },
                        ]}>
                        <View style={{paddingTop: theme.spacing * 2}}>
                          <PickNote 
                            onPress={this.toggleCommentInput}
                            note={savedNote}
                          />
                        </View>
                      </View>

                  </CardContent>
                  <CardActions>
                    
                  </CardActions>
                </Card>
              </View>
      </MainLayout>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  noRecordsTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    textAlign: 'center',
  },
});

interface PunchProps extends WithTheme,
    ConnectedProps<typeof connector> {
   navigation: NavigationProp<ParamListBase>;
}

interface PunchState {
  // date: string | undefined;
  // time: string |undefined;
  note: string;
  typingNote: boolean;

}

const mapStateToProps = (state: RootState) => ({
  punchStatus: selectPunchStatus(state),
  punchCurrentDateTime: selectPunchCurrentDateTime(state),
  savedNote: selectSavedPunchNote(state),
});

const mapDispatchToProps = {
  fetchPunchStatus,
  changePunchCurrentDateTime,
  setPunchNote,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PunchWithTheme = withTheme<PunchProps>()(
  Punch, 
);

export default connector(PunchWithTheme);
