import { MText, SizeBox } from 'components';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from 'utils/colors';

type Props = {
  isSelected: boolean;
  onSelect?: () => void;
  label?: string;
  isLastItem?: boolean;
};

const BranchItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={props.onSelect}>
        <SizeBox width={8} />
        <MText style={styles.text}>{props.label}</MText>
      </TouchableOpacity>
      {props.isLastItem ? null : <View style={styles.separator} />}
    </View>
  );
};

export default BranchItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  text: {
    color: colors.black[100],
  },
  separator: {
    height: 1,
    backgroundColor: colors.black[100],
    opacity: 0.05,
  },
});
