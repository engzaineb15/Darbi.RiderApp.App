

import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../../LanguageContext";
import { ChatMessageItemProps } from "./ChatMessageItem";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import ChatImage from "./ChatImage";
import { colors } from "../../utils/colors";
import { globalStyle } from "../../utils/GlobalStyle";
import { useState } from "react";
import FomChatModal from "./FomChatModal";
import utils from "../../utils";
const { width,height } = Dimensions.get('window');

interface ChatContractItemProps extends ChatMessageItemProps{
   
}
  
  const ChatContractItem: React.FC<ChatContractItemProps> = ({senderId, message})=>{

    const { isArabic } = useLanguage()
    const { navigate } = useNavigation()
    const { t } = useTranslation()
    const userId = useSelector((state: RootState) => state.user.userData?._id);
    let price = '', contractId = ''
    try{
        price = JSON.parse(message).price
        contractId = JSON.parse(message).contractId
    }catch(e){
        console.warn('Error Contract is Empty!')
    }

    const onPress = ()=>navigate('ContartDetails',{contractId})

  
    return(

<View style={{flexDirection: userId !== senderId ? 'row' : 'row-reverse'}}>
<ChatImage system/>
<View style={styles.SystemMessage}>
<View
        style={{
          marginVertical:5
        }}
        > 
<Text style={[styles.messageText, globalStyle.AbelFont]}>{
    isArabic? `لقد إرسلت عرض سعرك للعميل بسعر ${price} ريال` :`You sent a Contract to the client at a price of ${price} SAR.` }</Text>

</View>
<View
      style={{
        flexDirection: isArabic ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
<TouchableOpacity
    onPress={onPress}
    style={[styles.showContractBtn,{ width:width*0.65, }]}>
    <Text style={[styles.messageText, globalStyle.AbelFont, { color: colors.white, alignSelf: 'center' }]}>
        {t('ShowContract')}
    </Text>
</TouchableOpacity>
</View>
</View>
</View>
     
    )
  }

  
  const styles = StyleSheet.create({

    messageText: {
        fontSize: 17
    },
    SystemMessage: {
        maxWidth: '85%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius: 20,
        padding: 5,
        paddingHorizontal:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.notesGray 
    },
    showContractBtn: {
        marginTop: 5,
        paddingVertical: 5,
         borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor: colors.colorDarkcyan
    },
    lastMessage: {
      fontSize: 16,
      color: '#888',
      lineHeight: 15,
      // marginLeft:10
    },
   
    
})


export default ChatContractItem