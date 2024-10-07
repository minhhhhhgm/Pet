// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyALe5HaTCVYuY5xtL-_bI1bbh7mUHpNBHo',
  authDomain: 'petprj-2ef75.firebaseapp.com',
  projectId: 'petprj-2ef75',
  storageBucket: 'petprj-2ef75.appspot.com',
  messagingSenderId: '404922363687',
  appId: '1:404922363687:web:6522468b5d5b77fd830302',
  measurementId: 'G-BX445VBCL0',
};

// Initialize Firebase
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
// const analytics = getAnalytics(FirebaseApp);
