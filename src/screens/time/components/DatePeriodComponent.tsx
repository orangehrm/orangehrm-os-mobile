import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from 'lib/hook/useTheme';
import Text from 'components/DefaultText';
import IconButton from 'components/DefaultIconButton';

const DatePeriodComponent = (props: DatePeriodComponentProps) => {
  const theme = useTheme();
  const {onPressLeft, onPressRight, rightActive} = props;
  return (
    <>
      <View
        style={[
          styles.mainView,
          {
            paddingHorizontal: theme.spacing * 5,
            paddingVertical: theme.spacing * 2.5,
          },
        ]}>
        <View style={{}}>
          <Text style={[styles.textBold, {}]}>{'Date Period'}</Text>
        </View>
        <View
          style={[
            styles.rowFlexDirection,
            styles.justifyContentSpaceBetween,
            {
              paddingVertical: theme.spacing * 2.5,
            },
          ]}>
          <View>
            <IconButton
              iconProps={{name: 'chevron-left', color: 'red'}}
              buttonProps={{onPress: onPressLeft}}
            />
          </View>

          <View
            style={[
              styles.datePeroidView,
              {
                paddingHorizontal: theme.spacing * 2.5,
                borderRadius: theme.spacing * 2.5,
              },
            ]}>
            <Text
              style={[
                styles.textBold,
                {
                  color: theme.palette.secondary,
                  fontSize: theme.spacing * 4,
                  paddingVertical: theme.spacing,
                },
              ]}>
              {props.startDate.format('ddd, DD MMM YYYY')} {'to'}{' '}
              {props.endDate.format('ddd, DD MMM YYYY')}
            </Text>
          </View>
          <IconButton
            iconProps={{
              name: 'chevron-right',
              style: {color: rightActive ? 'black' : 'white'},
            }}
            buttonProps={{onPress: onPressRight, disabled: !rightActive}}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  noRecordsTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    textAlign: 'center',
  },
  durationMainView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  durationText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  briefcaseIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
  },

  textBold: {
    fontWeight: 'bold',
  },

  lastRecordDetailsMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
  },

  lastPunchText: {
    flex: 2,
    flexDirection: 'column',
  },

  colorWhite: {
    color: 'white',
  },

  flexFour: {
    flex: 4,
  },
  flexTwo: {
    flex: 2,
  },
  flexOne: {
    flex: 1,
  },
  flexThree: {
    flex: 3,
  },
  centerItems: {
    alignItems: 'center',
  },

  rowFlexDirection: {
    flexDirection: 'row',
  },
  hoursView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  datePeroidView: {
    backgroundColor: '#f2f3f5',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
});

interface DatePeriodComponentProps {
  onPressRight: () => void;
  onPressLeft: () => void;
  rightActive: boolean;
  leftActive: boolean;
  startDate: moment.Moment;
  endDate: moment.Moment;
}
export default DatePeriodComponent;
