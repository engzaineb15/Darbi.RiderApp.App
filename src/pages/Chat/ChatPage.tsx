
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity,  FlatList, StyleSheet, PermissionsAndroid, Platform, Dimensions, Pressable, StatusBar, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import moment from 'moment';
import { globalStyle } from '../../utils/GlobalStyle/index';
import CustomInput from '../../components/CustomInput';
import { ArrowLeft, contractIcon, driverIcon, fileIcon, logochat, LogoIcon, mouseSquare, note, personalcard, profile, profile2, profile3, sendIcon, shareLocationIcon, supportIcon_ar, supportIcon_en, whereshareIcon } from '../../utils/Images';
import { colors } from '../../utils/colors';
import CustomButton from '../../components/CustomButton';
import Modalize from '../../components/Modalize';
const { width, height } = Dimensions.get('window');
import { useDispatch, useSelector } from 'react-redux';
import CustomDropDownList from '../../components/CustomDropDownList';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal'
import useApi from '../../Api/useApi';
import utils from '../../utils';
import { useLanguage } from '../../../LanguageContext';
import ChatHeader from '../../components/ChatHeader';
import ChatInput from '../../components/ChatInput';
import MessageChatComp from '../../components/MessageChatComp';
import FomChatModal from '../../components/ChatMessage/FomChatModal';
import { fetchMessages, IMessage } from '../../redux/messagesSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux'
import { useSocket } from '../../Hooks/useSocket';
import ListFooter from '../../components/ListFooter';


const ChatPage = ({ navigation, route }: { navigation: any; route: any }) => {
  const {t, isArabic } = useLanguage();
  const { put } = useApi();
  const { roomId, otherUser } = route?.params;
  const [currentUserLocation, setcurrentUserLocation] = useState({})
  const [locationModal, setlocationModal] = useState(false);
  const [addModal, setaddModal] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const {  loading, messages, status, loading_page } = useSelector((state: RootState)=>state.messages)
  const [isLoading, setIsLoading] = useState(route.params?.isLoading || false);

  useEffect(()=>{
    markNotificationsAsSeen()
  },[roomId])


  useEffect(() => {
      dispatch(fetchMessages({roomId, page: 1}))
      setIsLoading(false);
  }, [isLoading]);


  if(loading || isLoading)
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'small'} color={colors.mainColor}/>
        </View>
    )

const markNotificationsAsSeen = async () => {
  try {
    await put("message/mark_seen", {});
    // console.log("Message marked as seen successfully");
  } catch (error: any) {
    console.error("Failed to mark notifications as seen:", error.response?.data || error.message);
  }
};


if(loading)
  return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'small'} color={colors.mainColor}/>
      </View>
  )
  
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'transparent'} ></StatusBar>
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    style={{ flex: 1 }}>
          <ChatHeader chatId={roomId} lastActivity={moment().subtract(10, 'minutes').toDate()} otherUser={otherUser} />

          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <MessageChatComp 
                item={item} 
                chatId={roomId} 
                currentUserLocation={null} 
                setcurrentUserLocation={null}
                otherUser={otherUser}
                setaddModal={setaddModal}
                setIsLoading={setIsLoading}
              />
            )}
            keyExtractor={(item: IMessage) => item._id}
            onEndReached={onEndReached}
            ListFooterComponent={()=><ListFooter loading={loading_page}/>}
            inverted
          
          />
      
          <ChatInput 
            currentUserLocation={currentUserLocation} 
            setcurrentUserLocation={setcurrentUserLocation} 
            locationModal={locationModal} 
            setlocationModal={setlocationModal} 
            roomId={roomId} 
            receiverId={otherUser?.id}     
            setIsLoading={setIsLoading}        
          />
    </KeyboardAvoidingView>

   
     
    </SafeAreaView>

  );
};



export default ChatPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container2: {
    backgroundColor:colors.notesGray,
    // height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: Platform.OS === "ios" ? 50 : 30,
    padding:20
  },
  container_btn_PageName: {
    alignSelf:"center",
    alignItems: "center",
  },
  btnBack: {
    borderColor: colors.grayBtn,
    borderWidth:0.4,
    backgroundColor: colors.btnBack,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
   
  },
  avterAndText:{
     width: '65%',
    marginHorizontal: 8 
  },
  bagsName: {
    // marginHorizontal: 20,
    fontSize: 18,
  },
  btn: {
    marginTop: 10,
  },
  PictureStyle:{
      // backgroundColor:"#00f",
      alignItems:"center",
      paddingHorizontal:5
  },
  continuerOfStatus :{
    color: colors.activestatus, 
      maxWidth: 60, fontSize: 12, alignSelf: "center", 
  },
  containerNavigation: {
    // backgroundColor:"#f00",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  NavigationBtnText: {
    fontSize: 14,
  },
  IconStyle: {
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  fileIconContainer: {
    marginRight: 10,
  },
  messageContainer: {
    paddingHorizontal: 10,
    // backgroundColor:"#0f0",
    paddingVertical: 5,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // backgroundColor:"#0f0",
    // justifyContent:'center'
    
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    backgroundColor: colors.notesGray ,
    marginBottom:10
  },
  SystemMessage: {
    maxWidth: '83%',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomLeftRadius: 20,
    padding: 10,
    paddingHorizontal:20,
    // alignItems:'center',
   justifyContent:'center'
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    lineHeight: 15,
    color:colors.grayTime,
    marginBottom:10,
  },
  receiverMessage: {
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius: 15,

  },
  userMessage: {
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomRightRadius: 15,
  },
  userTimeContainer: {
    alignSelf: 'flex-end',
    // marginTop: 5,
    marginRight: 55,
  },
  receiverTimeContainer: {
    alignSelf: 'flex-start',
    // marginTop: 5,
    marginLeft: 55,
  },
  optionsContainer: {
    marginTop: 40, 
  },
  btnSure: {
    marginVertical: 5,
    borderRadius: 78,
  },
  title: {
    fontSize: 18, 
    marginBottom: 10,
    lineHeight:20,
    alignSelf: "center",
  },
  smalltext:{
    alignSelf: "center",
    color:colors.gray,
    lineHeight:20
  },
  textButton:{
    color: colors.mainColor,
    fontSize: 16,
  },
  InputStyle: {
    // alignSelf: "flex-end",
    // width: width / 1.25,
    overflow: "hidden",
    // justifyContent: 'space-around',
    paddingHorizontal: 15,
    shadowColor:"rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(238, 238, 238, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#FFF",
    marginVertical:15
   
    
  },
  InputStyleModal :{
    // alignSelf: "flex-end",
    // width: width / 1.25,
    overflow: "hidden",
    paddingVertical:10,
    // flexDirection: isArabic?"row-reverse":"row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    shadowColor:"rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(238, 238, 238, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginTop:15

  },
  sendIconView:{
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 105.92,
    backgroundColor:colors.mainColor,
    display: "flex",
    width: 40,
    height: 40,
  },
  StyleIconSend: { 
      //  position: "relative",
       width: 22,
      aspectRatio: "1"  
      },
  keyboardAvoidingContainer: {
    // flex:1,
    width:'100%',
    marginBottom: 10,
    paddingVertical:10,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    // backgroundColor:"#0f0",
  },
  inputMainContainerStyle: {
    // backgroundColor:"#0f0",
    width: '100%',
      justifyContent: "space-around",
       alignItems: "center", 
       paddingHorizontal:10
  },
  styleIcons:{
      justifyContent: "space-between",
      
  },
  modalContainer: {
    flex: 1,
  },
  titleTextModal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});









