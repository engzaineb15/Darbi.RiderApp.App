import { Image, View, StyleSheet } from "react-native"
import { LogoIcon, noImageIcon } from "../../utils/Images"
import { colors } from "../../utils/colors"

const ChatImage: React.FC<{image?: string, system?: boolean}> = ({image, system})=>{

    if(system)
      return(
          <View style={styles.defaultSystemImageContainer}>
            <Image 
                source={LogoIcon} 
                style={{ width: 30, height: 30 }} 
                resizeMode='contain' 
            />
          </View>
      )
    else
    return(
            <Image 
                source={image ? {uri: image} : noImageIcon} 
                resizeMode="contain" 
                style={styles.defaultImageContainer} 
            />        
    )
  }

const styles = StyleSheet.create({
  defaultSystemImageContainer: { 
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.notesGray,
    alignSelf:'flex-start',
    marginTop:10
  },
  defaultImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor:colors.nopersoncoloe,
    alignItems:"center",
    justifyContent:"center"
  },
})



export default ChatImage