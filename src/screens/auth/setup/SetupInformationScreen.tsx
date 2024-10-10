import {
  Column,
  Container,
  MButton,
  MText,
  SizeBox,
  TextField,
} from 'components';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from 'utils/colors';
import { ChevronLeft } from 'utils/icons';
import { Step } from '../login/hooks/useLogin';
import useSetup from './hooks/useSetup';

const SetUpInformationScreen = () => {
  const {
    firstName,
    lastName,
    onChangeFirstName,
    onChangeLastName,
    isValidName,
    onLogin,
  } = useSetup();
  return (
    <Container useDismissKeyboard avoidKeyboard={false} scrollable>
      <Column>
        <TouchableOpacity style={styles.header}>
          <ChevronLeft color={colors.white} width={18} height={18} />
        </TouchableOpacity>

        <SizeBox height={100} />

        <Column>
          <View style={{ alignItems: 'center' }}>
            <MText fontSize={28} fontWeight="700">
              What's your name?
            </MText>
          </View>
          <SizeBox height={24} />

          <TextField
            inputWrapperStyle={{ marginHorizontal: 28, paddingHorizontal: 6 }}
            onChangeText={onChangeFirstName}
            value={firstName}
            placeholder="First name"
          />
          <SizeBox height={24} />

          <TextField
            inputWrapperStyle={{ marginHorizontal: 28, paddingHorizontal: 6 }}
            onChangeText={onChangeLastName}
            value={lastName}
            placeholder="Last name"
          />
        </Column>
        <SizeBox height={80} />

        <MButton
          isBoldLabel
          disabled={!isValidName}
          style={{ marginHorizontal: 28 }}
          label="Continue"
          onPress={onLogin}
        />
      </Column>
    </Container>
  );
};

export default SetUpInformationScreen;

const styles = StyleSheet.create({
  header: {
    borderRadius: 30,
    backgroundColor: '#2E2E2E',
    flexDirection: 'row',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 28,
    marginTop: 15,
  },
});
