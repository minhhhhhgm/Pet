import { StyleSheet, View } from 'react-native';
import colors from 'utils/colors';

type StepperProps = {
  currentStep: number;
  tabs: number;
};

export default function Stepper({ currentStep, tabs }: StepperProps) {
  const renderTabs = (tabs: number) => {
    let views = [];
    for (let i = 1; i <= tabs; i++) {
      views.push(
        <View
          key={i}
          style={[
            styles.tab,
            {
              backgroundColor:
                currentStep >= i ? colors.primary : colors.green[50],
            },
          ]}
        />,
      );
    }
    return views;
  };

  return <View style={styles.tabsContainer}>{renderTabs(tabs)}</View>;
}

const styles = StyleSheet.create({
  tabsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 15,
  },
  tab: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
});
