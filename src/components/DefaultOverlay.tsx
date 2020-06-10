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
