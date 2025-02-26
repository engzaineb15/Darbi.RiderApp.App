import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplachScreen from "../pages/Splash/SplashScreen";
import OtpPage from "../pages/Auth/OtpPage";
import AuthPage from "../pages/Auth/AuthPage";
import SplashStartNow from "../pages/Splash/SplashStartNow";
import AddPersonalInfo from "../pages/PersonalInfo/AddPersonalInfo";
import TermsConditionsLogin from "../pages/Splash/TermsConditionsLogin";
import StartApp from "../pages/Splash/StartApp";

import { StatusBar } from "react-native";
import { colors } from "../utils/colors";
const NavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        animated
        showHideTransition={"fade"}
        barStyle={"light-content"}
        backgroundColor={colors.mainColor}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplachScreen" component={SplachScreen} />
        <Stack.Screen name="SplashStartNow" component={SplashStartNow} />
        <Stack.Screen name="TermsConditionsLogin" component={TermsConditionsLogin} />
        <Stack.Screen name="StartApp" component={StartApp} />
        <Stack.Screen name="AuthPage" component={AuthPage} />
        <Stack.Screen name="OtpPage" component={OtpPage} />
        <Stack.Screen name="AddPersonalInfo" component={AddPersonalInfo} />
        


      </Stack.Navigator>
    </>
  );
};

export default NavigationStack;
