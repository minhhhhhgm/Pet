import React, { Fragment } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { useAppSelector } from 'reduxStore';
import colors from 'utils/colors';

const Loading = () => {
  const { loading } = useAppSelector(state => state.loading);

  return (
    <Fragment>
      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}>
        <View style={styles.loadingStyle}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
});

export default Loading;
