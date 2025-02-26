

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMap from "../pages/BottomBar/MainMap"; 
import React, { useEffect, useState } from "react";
import NavigationBottomBarStack from "./NavigationBottomBarStack";
import AddAdvertisements from "../pages/Advertisements/AddAdvertisements";
import Map from '../pages/Advertisements/Map'
import Notifications from "../pages/Advertisements/Notifications";
import ChatPage from '../pages/Chat/ChatPage'
import NewContract from "../pages/MyContracts/NewContract";
import ConfirmedAdv from '../pages/Advertisements/ConfirmedAdv';
import ProfileSettings from '../pages/UserProfile/ProfileSettings'
import MyTrip from '../pages/BottomBar/MyTrip'
import MyWallet from "../pages/Wallet.tsx/MyWallet";
import MySettings from "../pages/Settings/MySettings";
import ContartDetails from "../pages/MyContracts/ContartDetails";
import ServiceDetails from "../pages/Service/ServiceDetails";
import DoneContract from "../pages/MyContracts/DoneContract";
import SearchHistory from "../components/MainMapComp/SearchHistory";
import { StatusBar } from "react-native";
import {requestUserPermission, getToken, setupFirebaseListeners} from '../utils/Firebase/firebaseConfig';
import messaging from '@react-native-firebase/messaging';
import useApi from "../Api/useApi";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSocket } from "../Hooks/useSocket";
import AboutApp from '../pages/AdditionalPages/AboutApp';
import TermsConditions from '../pages/AdditionalPages/TermsConditions'
import SupportChatMainPage from '../pages/SupportCaht/SupportChatMainPage';
import SupportChatListPage from '../pages/SupportCaht/SupportChatListPage';
import ContactUs from "../pages/SupportCaht/ContactUs";
import ReadMessages from "../pages/SupportCaht/ReadMessages";
import TellUsMore from "../pages/SupportCaht/TellUsMore";
import SendReply from "../pages/SupportCaht/SendReply";
import AddPersonalInfo from "../pages/PersonalInfo/AddPersonalInfo";
/* 
  FCM TOKEN:
 1. sent token After login
 2. update token if current !== stored token
 3. delete token when logout
*/


const MainStack = () => {
  const { put, post } = useApi();
  const { isConnected, connect } = useSocket()

  const userData = useSelector((state: any) => state.user.userData);
console.log("Full userData object:", userData);

const nationalID = userData.nationalID;
console.log("nationalID:", nationalID);


  //SENT FCM TOKEN TO API FIRST TIME
  const sentFCMToken = ()=>new Promise<void>(async(reslove, reject)=>{
    try{
      const fcm_token = await messaging().getToken();
      await AsyncStorage.setItem('fcm_token', fcm_token)
      const response = await post('rider/addFcmToken', { newToken: fcm_token });
      reslove()
    }catch(e){
      reject(e)
    }
  })



  //UPDATE FCM TOKEN IF THERE IS A CHANGE
  const updateFCM = async()=>{
    try{
      const fcm_token = await messaging().getToken();
      const stored_fcm_token =  await AsyncStorage.getItem('fcm_token')
      if(stored_fcm_token && fcm_token !== stored_fcm_token){
        await AsyncStorage.setItem('fcm_token', fcm_token)
        const response = await put('rider/updateFcmToken', { newToken: fcm_token, oldToken: stored_fcm_token });
      }
      return

    }catch(e){
    }
  }


  useEffect(() => {
    sentFCMToken()
    updateFCM()
    requestUserPermission();
    connect()
    
  }, []);


  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar
        animated
        showHideTransition={"fade"}
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
<Stack.Navigator screenOptions={{ headerShown: false }}

 >

        {

        !userData?.nationalID ?
        <>
            <Stack.Screen name="AddPersonalInfo" component={AddPersonalInfo} />
           
        </>
        :
        <></>
        }

        <Stack.Screen
          name="NavigationBottomBarStack"
          component={NavigationBottomBarStack}
        />
        <Stack.Screen name="AddAdvertisements" component={AddAdvertisements} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
        <Stack.Screen name="SupportChatMainPage" component={SupportChatMainPage} />
        <Stack.Screen name="SupportChatListPage" component={SupportChatListPage} />
        <Stack.Screen name="ReadMessages" component={ReadMessages} />
        <Stack.Screen name="TellUsMore" component={TellUsMore} />
        <Stack.Screen name="SendReply" component={SendReply} />
        
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="NewContract" component={NewContract} />
        <Stack.Screen name="ContartDetails" component={ContartDetails} />
        <Stack.Screen name="ConfirmedAdv" component={ConfirmedAdv} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
        <Stack.Screen name="MySettings" component={MySettings} />
        <Stack.Screen name="MyTrip" component={MyTrip} />
        <Stack.Screen name="MyWallet" component={MyWallet} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
        <Stack.Screen name="DoneContract" component={DoneContract} />
        <Stack.Screen name="SearchHistory" component={SearchHistory} />
        <Stack.Screen name="AboutApp" component={AboutApp} />
        <Stack.Screen name="TermsConditions" component={TermsConditions} />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
