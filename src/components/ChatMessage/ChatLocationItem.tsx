import { useNavigation } from "@react-navigation/native"
import { useLanguage } from "../../../LanguageContext"
import { ChatMessageItemProps } from "./ChatMessageItem"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"
import { Text, TouchableOpacity, View, StyleSheet ,Dimensions} from "react-native"
import { colors } from "../../utils/colors"
import { globalStyle } from "../../utils/GlobalStyle"
import ChatImage from "./ChatImage"
import utils from "../../utils"
import { useState } from "react"
const { width,height } = Dimensions.get('window');

interface ChatLocationItemProps extends ChatMessageItemProps{
    latitude: string,
    longitude: string
  }
  
  const ChatLocationItem: React.FC<ChatLocationItemProps> = ({senderId, message,messageId,latitude,longitude,setIsLoading})=>{
  
    const { isArabic } = useLanguage()
    const { navigate } = useNavigation()
    const { t } = useTranslation()
    const userId = useSelector((state: RootState) => state.user.userData?._id);
    const token = useSelector((state: any) => state.user.token);
    const [isDeleted, setIsDeleted] = useState(false); 
  
  // console.log("messageId >>"+messageId)/



  // console.log("Latitude:", latitude);
  // console.log("Longitude:", longitude);

  const handleDeleteMessage = async () => {
    setIsLoading(true);
    try {
        const response = await fetch(`https://goldfish-app-v6zpg.ondigitalocean.app/api/message/${messageId}`, {
            method: 'DELETE',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
        });

        if (response.status >= 200 && response.status < 300) {

          setIsDeleted(true);
        utils.toastAlert('success', isArabic ? "تم حذف الرسالة بنجاح" : "Message deleted successfully" );
        setIsLoading(false)
        
        } else {
            console.error("Failed to delete message");
        }
    } catch (error) {
        console.error("Error deleting message:", error);
    }
};


if (isDeleted) return null;

  
    return(
    <View style={{flexDirection: userId !== senderId ? 'row' : 'row-reverse'}}>
      <ChatImage system/>


  <View style={[styles.SystemMessage, { backgroundColor: colors.notesGray }]}>
  <View
                style={{
                  marginVertical:5
                }}
                > 
              <Text style={[styles.messageText, globalStyle.AbelFont]}>{t('contractLocMess')}</Text>
    </View>
            <View
              style={{
                width:'100%',
                alignItems:'center',
                justifyContent:'center',
                marginVertical: 10,
                // backgroundColor:"#0f0"
              }}>
       


              <TouchableOpacity
                onPress={handleDeleteMessage}
                style={styles.locationBtn}>
                <Text style={[styles.messageText, globalStyle.AbelFont, { color: colors.lightred, alignSelf: 'center' }]}>{t('dele')}</Text>
              </TouchableOpacity>
              </View>
            </View>
       
            </View>
     

    )
  }
  
  const styles = StyleSheet.create({

    messageText: {
        fontSize: 18
    },
    SystemMessage: {
        maxWidth: '85%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomLeftRadius: 20,
        padding: 5,
        paddingHorizontal:20,
        justifyContent:'center'
    },
    locationBtn: {
      width:width*0.4,
      // marginTop: 5,
      borderRadius: 30,
      paddingHorizontal: 35,
      paddingVertical: 8,
      backgroundColor: colors.light,
      alignItems:'center',
      justifyContent:'center'
    }
})


export default ChatLocationItem