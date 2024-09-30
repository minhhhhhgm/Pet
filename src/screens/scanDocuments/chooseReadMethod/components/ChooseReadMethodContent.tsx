import { Container, MButton, MText, SizeBox } from 'components';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import colors from 'utils/colors';
import BranchItem from './BranchItem';
import { ReadMethod } from '../hooks/useChooseReadMethod';

interface ChooseReadMethodContentProps {
  readMethods: {
    label: string;
    id: ReadMethod;
  }[];
  selectedMethod: ReadMethod;
  setSelectedMethod: (method: ReadMethod) => void;
  onSubmit: () => void;
}

const ChooseReadMethodContent = ({
  readMethods,
  selectedMethod,
  setSelectedMethod,
  onSubmit,
}: ChooseReadMethodContentProps) => {
  return (
    <Container
      isShowHeader
      showBackButton
      showBackButtonIcon
      title={"translate('scanQRCode.chooseReadMethod.title')"}
      BGColor={colors.white}
      style={styles.wrapper}>
      <SizeBox height={40} />

      <MText style={styles.pleaseChooseText}>
        {"translate('scanQRCode.chooseReadMethod.pleaseChooseReadMethod')"}
      </MText>
      <SizeBox height={8} />
      <FlatList
        scrollEnabled={false}
        data={readMethods}
        style={styles.scrollViewContainer}
        keyExtractor={item => item.label}
        renderItem={({ item }) => (
          <BranchItem
            label={item.label}
            isSelected={selectedMethod === item.id}
            onSelect={() => setSelectedMethod(item.id)}
          />
        )}
      />

      <SizeBox height={40} />
      <MButton label={"translate('scanQRCode.chooseReadMethod.beginRead')"} onPress={onSubmit} />
    </Container>
  );
};

export default ChooseReadMethodContent;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.gray[10],
  },
  pleaseChooseText: {},
  scrollViewContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    flexGrow: 0,
    minHeight: 70,
  },
});
