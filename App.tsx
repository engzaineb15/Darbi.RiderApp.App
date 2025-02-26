import "expo-dev-client";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, I18nManager, StatusBar, StyleSheet, View, AppState, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigationStack from "./src/navigation/AppNavigationStack";
import store from "./src/redux";
import { I18nextProvider } from 'react-i18next';
import i18n from "./src/i18n";
import Toast from "react-native-toast-message";
import * as Localization from 'expo-localization';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {requestUserPermission, getToken, setupFirebaseListeners } from './src/utils/Firebase/firebaseConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates"


try {
  I18nManager.allowRTL(false); 
}
catch (e) {
  console.log(e);
}

const checkSystemLang = async()=>{
  let isExists = await AsyncStorage.getItem('lang')
  let lang = Localization.getLocales()[0].languageTag.includes('en') ? 'en' : 'ar'
  if(!isExists && lang === 'ar'){
    await AsyncStorage.setItem('lang', lang)
    Updates.reloadAsync()
  }
}


const App = () => {
  
  useEffect(() => {
    /* Fix expo bug when so language is arabic */
    checkSystemLang()
  
  }, []);

 
  
  let persistor = persistStore(store);
  const [fontsLoaded] = useFonts({
    Abel: require("./assets/fonts/Abel-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  }


  return (
    <>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar
              barStyle={"dark-content"}
              backgroundColor={"transparent"}
            />
            <NavigationContainer>
              <AppNavigationStack />
            </NavigationContainer>
          </PersistGate>
      </Provider>
      <Toast />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


