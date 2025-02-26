import React, { useEffect, useState } from 'react';
import { View, Text ,StyleSheet } from 'react-native';
import { useLanguage } from '../../LanguageContext';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import * as Location from 'expo-location';
import { IMessage } from '../redux/messagesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import ChatMessageItem from './ChatMessage/ChatMessageItem';
import ChatLocationItem from './ChatMessage/ChatLocationItem';
import ChatContractItem from './ChatMessage/ChatContractItem';
import moment from "moment";
import 'moment/locale/en-gb';
import 'moment/locale/ar';
interface MessageProps{
  messageId: string;
  item: IMessage; 
  chatId: string; 
  currentUserLocation: any; 
  setcurrentUserLocation: any; 
  Price: number;
  otherUser: {
    name: string,
    id: string;
    image?: string
  },
  setaddModal: any
}
  


const Message: React.FC<MessageProps> = ({ item, otherUser ,setIsLoading}) => {

  
    const { t, isArabic } = useLanguage();
    const navigation = useNavigation();
    const userId = useSelector((state: RootState) => state.user.userData?._id);
    const userData = useSelector((state: any) => state.user.userData);
    const currentLanguage = isArabic ? 'ar' : 'en';
    moment.locale(currentLanguage);
    
    // console.log("item.message >>", item);
    

    let content = null

    switch(item.messageType){
      case 'message': 
        content = <ChatMessageItem senderId={item.senderId} message={item.message} image={otherUser?.image}/>
        break;
      case 'contract':
        content = <ChatContractItem senderId={item.senderId} message={item.message}   />
        break;
      case 'location':
        content = <ChatLocationItem  setIsLoading={setIsLoading} senderId={item.senderId} message={item.message} latitude={item?.message.split(',')[0]} longitude={item?.message.split(',')[1]} messageId={item?._id}/>
        break;
      default: 
        content = <ChatMessageItem senderId={item.senderId} message={item.message} image={otherUser?.image}/>
        break;
    }


  

  return (
    
 
    <View style={styles.messageContainer}>
      <View style={[styles.messageContent, {
           justifyContent: item.senderId === userId ? 'flex-end' : 'flex-start',
         }]}>
        {content}
      </View>    
      {content ? (     
      <View style={item.receiverId !== userId ? styles.userTimeContainer : styles.receiverTimeContainer}>
        <Text style={[styles.timeText, { marginTop:5 }]}>{moment(item.timestamp).fromNow()}</Text>
      </View>
      ) 
      :null }  
    </View>

  );
};


const styles = StyleSheet.create({
  messageContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    lineHeight: 15,
    color:colors.grayTime,
    marginBottom:10,
  },
  userTimeContainer: {
    alignSelf: 'flex-end',
    marginRight: 55,
  },
  receiverTimeContainer: {
    alignSelf: 'flex-start',
    // marginTop: 5,
    marginLeft: 55,
  },
});

export default Message;


