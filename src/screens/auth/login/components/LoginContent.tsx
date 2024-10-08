import auth from '@react-native-firebase/auth';
import {
  Column,
  Container,
  MButton,
  MText,
  SizeBox,
  TextField,
} from 'components';
import { navigate } from 'navigation/service';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import colors from 'utils/colors';
import { ChevronLeft, VnFlag } from 'utils/icons';
import { deviceHeight } from 'utils/themes';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'services/firebass-config';
import { useAppDispatch } from 'reduxStore';
import { setGlobalLoading } from 'reduxStore/slices/loadingSlice';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { Step } from '../hooks/useLogin';

type LoginContentProps = {
  email?: string;
  onEmailChange?: (text?: string) => void;
  password?: string;
  onPasswordChange?: (text?: string) => void;
  onPushResetPassword?: () => void;
  isPasswordAndEmailValid?: boolean;
  onLogin: () => void;
  step?: Step;
  ocStepChange?: () => void;
  enable?: boolean;
  isValid?: boolean,
    isValidPassword?: boolean,
};

function LoginContent(props: LoginContentProps) {
  const {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onLogin,
    step,
    ocStepChange,
    enable,
    isValid,
    isValidPassword,
  } = props;

  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState<any>('');
  const dispatch = useAppDispatch();

  async function signInWithPhoneNumberF() {
    try {
      const confirmation = await auth().createUserWithEmailAndPassword(
        'oo@mail.com',
        '100000',
      );
      setConfirm(confirmation);
      console.log('conf', confirmation);
    } catch (error) {
      console.error('Error during phone sign-in:', error);
    }
  }

  const handleChangeAvatar = async () => {
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = ref(storage, 'images/' + Date.now());
    const uri =
      'https://firebasestorage.googleapis.com/v0/b/newsapp-e1932.appspot.com/o/images%2F1712654333705?alt=media&token=53d24749-188f-4c42-8a5f-9d1190de703e';
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      uploadTask.on(
        'state_changed',
        snapshot => {
          console.log('snapshot', snapshot);
        },
        error => {
          console.log('error', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            console.log('File available at', downloadURL);
            const update = {
              photoURL: downloadURL,
            };
          });
        },
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'meomeo Channel',
    });

    console.log('channel id', channelId);

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Display a local notification
      console.log('remoteMessage', remoteMessage);

      const channelId = await notifee.createChannel({
        id: 'pet',
        name: 'pet Channel',
      });
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher', // Đảm bảo bạn có biểu tượng nhỏ này
          largeIcon: 'ic_launcher', // Đảm bảo bạn có biểu tượng lớn này
        },
      });
    });
    return unsubscribe;
  }, []);

  // useEffect(()=>{
  //   const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     // Display a local notification
  //     console.log('setBackgroundMessageHandler',remoteMessage);

  //   });
  //   return unsubscribe;
  // },[])


  return (
    <Container useDismissKeyboard avoidKeyboard={false} BGColor="#111111">
      <Column>
        <TouchableOpacity style={styles.header}>
          <ChevronLeft color={colors.white} width={18} height={18} />
        </TouchableOpacity>

        <SizeBox height={100} />

        {step === Step.EMAIL ? (
          <Column>
            <View style={{ alignItems: 'center' }}>
              <MText fontSize={28} fontWeight="700">
                What's your email?
              </MText>
            </View>
            <SizeBox height={24} />

            <TextField
              // autoFocus
              inputWrapperStyle={{ marginHorizontal: 28, paddingHorizontal: 6 }}
              onChangeText={onEmailChange}
              value={email}
            />
          </Column>
        ) : (
          <Column>
            <View style={{ alignItems: 'center' }}>
              <MText fontSize={28} fontWeight="700">
                What's your password?
              </MText>
            </View>
            <SizeBox height={24} />
            <TextField
              // autoFocus
              inputWrapperStyle={{ marginHorizontal: 28, paddingHorizontal: 6 }}
              onChangeText={onPasswordChange}
              value={password}
            />
          </Column>
        )}
        <SizeBox height={80} />

        <MButton
          disabled={step === Step.EMAIL ? !isValid : !isValidPassword}
          style={{ marginHorizontal: 28 }}
          onPress={() => {
            // signInWithPhoneNumberF()
            // navigate('MAIN_CAM');
            // dispatch(setGlobalLoading(true))
            // handleChangeAvatar()
            // onDisplayNotification()
            ocStepChange!()
          }}
        />
      </Column>
    </Container>
  );
}

export default LoginContent;

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
