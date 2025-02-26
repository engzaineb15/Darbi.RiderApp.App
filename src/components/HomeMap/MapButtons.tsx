import { Image, Platform, Pressable, StyleSheet, View,TouchableOpacity } from "react-native"
import { globalIcon, gpsIcon } from "../../utils/Images"
import { useLanguage } from "../../../LanguageContext"

interface MapButtonsProps{
    onPressGPS: ()=>void,
    onPressGlobal: ()=>void
}

const MapButtons: React.FC<MapButtonsProps> = ({
    onPressGPS,
    onPressGlobal
})=>{
    const { isArabic } = useLanguage()
    return(
        <View style={[styles.btnsContainer,{
        bottom: Platform.OS === 'ios' ? 65 : 130,

        }]}>
            <View
                style={{
                    alignItems:isArabic ?"flex-end":"flex-start",
                }}>
           
       
            <TouchableOpacity onPress={onPressGPS}>
                <Image
                    style={styles.gpsImage}
                    source={gpsIcon}
                />
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnsContainer: {
        position: 'absolute',
        width:"100%",
    },
    globalImage: {
        width: 80,
        height: 80,
        marginBottom:-35,
    },
    gpsImage: {
        width: 80,
        height: 80,
    }
})

export default MapButtons