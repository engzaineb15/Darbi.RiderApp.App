import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { View, Text, StyleSheet } from "react-native";
import ChatImage from "./ChatImage";
import { colors } from "../../utils/colors";
import { responsiveWidth } from "../../utils/GlobalStyle";

export interface ChatMessageItemProps{
    messageId: string;
    senderId: string;
    message: string;
    image?: string
}
  
const ChatMessageItem: React.FC<ChatMessageItemProps> = ({senderId, message, image})=>{
    const userId = useSelector((state: RootState) => state.user.userData?._id);
    const userImage = useSelector((state: RootState) => state.user.userData?.image);

  
    return(
      <View style={{
        // flexDirection: userId !== senderId ? 'row' : 'row-reverse'
        flexDirection: userId === senderId ? 'row-reverse' : 'row'
        }}>
        <ChatImage image = {senderId === userId ? userImage :  image}/>
        <View 
            style={[
            styles.message,
            senderId === userId ? styles.receiverMessage : styles.userMessage
            ]}
        > 
            <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>
    )
}
  
const styles = StyleSheet.create({
    message: {
        maxWidth: responsiveWidth(288),
        padding: 10,
        backgroundColor: colors.notesGray ,
        // marginBottom:10
    },
    messageText: {
        fontSize: 16
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
})

export default ChatMessageItem