import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { BaseToast } from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
const FcmToken = async () => await messaging().getToken();


async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
    console.log('Data cleared');
  } catch (error) {
    console.error("Couldn't clear data", error);
  }
}

function toastAlert(type: 'success' | 'error' | 'info' | 'any', text1: string, text2?: string): void {
  Toast.show({
    type,
    text1,
    text2,
    
  });
}

export default {
//   get,
//   set,
  clear,
  toastAlert,
  FcmToken
};
