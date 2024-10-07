import auth from '@react-native-firebase/auth';
import { Container, MButton, MText, SizeBox, TextField } from 'components';
import { navigate } from 'navigation/service';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import colors from 'utils/colors';
import { VnFlag } from 'utils/icons';
import { deviceHeight } from 'utils/themes';

type LoginContentProps = {
  email?: string;
  onEmailChange?: (text?: string) => void;
  password?: string;
  onPasswordChange?: (text?: string) => void;
  onPushResetPassword?: () => void;
  isPasswordAndEmailValid?: boolean;
  onLogin: () => void;
};

function LoginContent(props: LoginContentProps) {
  const {
    email,
    password,
    isPasswordAndEmailValid,
    onEmailChange,
    onPasswordChange,
    onPushResetPassword,
    onLogin,
  } = props;

  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState<any>('');

  async function signInWithPhoneNumberF() {
    try {
      const confirmation = await auth().signInWithPhoneNumber('+84 0373841282');
      setConfirm(confirmation);
      console.log('conf', confirmation);
    } catch (error) {
      console.error('Error during phone sign-in:', error);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const device = useCameraDevice('back');

  return (
    <Container useDismissKeyboard avoidKeyboard={false} BGColor="#111111">
      {/* <SizeBox height={200} /> */}
      <Camera
                    style={{
                        // position: 'absolute',
                        top: 100,
                        width: '100%',
                        height: deviceHeight * 0.6,
                    }}
                    device={device!}
                    isActive={true}
                    photo={true}
                    //   video={true}
                    // ref={camera}
                />
      <View style={{ alignItems: 'center' }}>
        <MText fontSize={24} fontWeight="700">
          What's your numbers?
        </MText>
      </View>
      <SizeBox height={24} />
      <TextField
        inputWrapperStyle={{ marginHorizontal: 28, paddingHorizontal: 6 }}
        LeftIcon={
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <VnFlag width={25} height={36} />
          </View>
        }
      />
      <MButton
        onPress={() => {
          // signInWithPhoneNumberF()
          navigate('MAIN_CAM');
        }}
      />
    </Container>
  );
}

export default LoginContent;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  header: {
    backgroundColor: colors.gray[80],
    borderBottomWidth: 1,
    borderBottomColor: colors.black[50],
  },
});
