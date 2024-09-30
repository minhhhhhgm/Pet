import React, { Fragment } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppSelector } from 'reduxStore';
import colors from 'utils/colors';

const Loading = () => {
  const { loading } = useAppSelector(state => state.loading);

  return (
    <Fragment>
      {loading && (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
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
    backgroundColor: colors.loading,
    zIndex: 9999,
  },
});

export default Loading;
