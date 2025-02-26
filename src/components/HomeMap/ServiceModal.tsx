import { View, Modal, TouchableOpacity, Image, Text, StyleSheet, Platform } from "react-native";
import ServiceDetails from "../../pages/Service/ServiceDetails";
import { canclegray } from "../../utils/Images";
import { useLanguage } from "../../../LanguageContext";
import { globalStyle } from "../../utils/GlobalStyle";
import { colors } from "../../utils/colors";

interface ServiceModalProps {
    OpenServiceDetails: boolean;
    setOpenServiceDetails: (v: boolean)=>void,
    selectedDriverID: string
}


const ServiceModal: React.FC<ServiceModalProps> = ({
    OpenServiceDetails,
    setOpenServiceDetails,
    selectedDriverID
})=>{
    
    const { isArabic, t } = useLanguage()

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={OpenServiceDetails}
            statusBarTranslucent
            onRequestClose={() => {
                setOpenServiceDetails(false);
            }}
        >
            <View style={styles.basicContainer}>
                <View style={[styles.header]}>
                    <View style={{
                    flexDirection: isArabic  ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    //   justifyContent:"flex-end",
                // backgroundColor:"#0f0",
                    }}>
                    <TouchableOpacity
                        onPress={() => 
                        {setOpenServiceDetails(false)}
                        }
                        style={{
                            // backgroundColor:"#0ff",
                            flexDirection: isArabic  ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        >
                        <Image source={canclegray} resizeMode="cover" style={{
                            width: 20,
                            height: 20,
                            marginLeft: isArabic  ? 5 : 5, marginRight: isArabic  ? 0 : 5
                            }} />

                        <Text style={[styles.lastMessage, globalStyle.AbelFont, { 
                            fontSize: 17, color: colors.grayText,
                        alignSelf: isArabic  ? "flex-end" : "flex-start",

                        }]}>{t('Close')}</Text>
                    </TouchableOpacity>
            </View>
            <View style={{
                flexDirection: isArabic  ? 'row-reverse' : 'row',
                // backgroundColor:"#0f0",
                alignItems: 'center',
                justifyContent: "space-between",
                marginTop: 10
            }} >
                <Text style={[styles.pageName,globalStyle.AbelFont]}>
                {t('Service_ADV')}
                </Text>
            </View>
            </View>
                <ServiceDetails DriverID={selectedDriverID} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    basicContainer: {
        flex: 1,
        backgroundColor: colors.white,
      },
      header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 80 : 40,
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,    
      },
      lastMessage: {
        fontSize: 16,
        color: colors.textcolor,
        lineHeight: 30,
      },
      pageName: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.black,
      },
})


export default ServiceModal