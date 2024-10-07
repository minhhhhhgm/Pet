import auth from '@react-native-firebase/auth';
import { Container, MButton, MText, SizeBox, TextField } from 'components';
import { navigate } from 'navigation/service';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import colors from 'utils/colors';
import { VnFlag } from 'utils/icons';
import { deviceHeight } from 'utils/themes';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'services/firebass-config';
import { useAppDispatch } from 'reduxStore';
import { setGlobalLoading } from 'reduxStore/slices/loadingSlice';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

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

  const device = useCameraDevice('back');

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
      {/* <SizeBox height={200} /> */}
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
          // dispatch(setGlobalLoading(true))
          // handleChangeAvatar()
          // onDisplayNotification()
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
