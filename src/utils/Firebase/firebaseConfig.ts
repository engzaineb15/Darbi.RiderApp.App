import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { Alert } from 'react-native';
import useApi from '../../Api/useApi';

// Request permission to receive notifications
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};



export const getToken = async () => {
  const token = await messaging().getToken();
  console.log("FCM Token", token);
};

 

// Set up Firebase listeners
export const setupFirebaseListeners = () => {
  messaging().getInitialNotification().then(async (remoteMessage) => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification?.title
      );
    }
  });

  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification?.title
      );
      // Navigation handling if needed
    }
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  return unsubscribe;
};
