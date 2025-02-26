import React, { useState ,useEffect} from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { globalStyle } from "../../utils/GlobalStyle";
import {
  FrameHeader,
  massegeNotify,
  messages2,
  noperson,
  notifyIcon,
  notifysIcon,
  profile,
  Verifiedtick,
} from "../../utils/Images";
import { colors } from "../../utils/colors";
import { Image } from "expo-image";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import PersonalInfo from "./PersonalInfo"; 
import CarInfo from "./CarInfo"; 
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../Api/useApi";
import { setUser } from "../../redux/user";
import { useLanguage } from "../../../LanguageContext";


const ProfileSettings = ({ navigation, route }: any) => {
  const {t, isArabic} = useLanguage();
  const user = useSelector((state: any) => state.user);
  const userData = useSelector((state: any) => state.user.userData);
  const [NotifyCounter, setNotifyCounter] = useState<number>(0)


  
  const BadgeNotify = ({ count }: { count: number }) => (
    <View style={style.badgeContainerNotify}>
      <Text style={style.badgeTextNotify}>{NotifyCounter}</Text>
    </View>
  );


  return (
    <>
      <StatusBar barStyle={"light-content"} translucent={true} />
      <View style={[globalStyle.basicContainerNotCenter]}>

      

<View style={style.containerInfo}>
          <Image
                  style={[style.gradientBgIcon, style.iconLayout1]}
                  contentFit="cover"
                  source={FrameHeader}
                />
       


<View  style={[style.IconsHeaderView,{
    flexDirection:isArabic?"row-reverse":"row",

}]}>

<View style={[style.IconHaeder,{backgroundColor:'transparent'}]}>

<Pressable 
            onPress={() => 
              navigation.navigate('NavigationBottomBarStack', { screen: t('Chat') })
            }
            style={{
              // backgroundColor:"#0f0",
              alignItems:'center',
              justifyContent:'center',
              // marginTop:3,

            }}
            >

  </Pressable>
  
</View>



<View style={style.IconHaeder}>

            <Pressable 
            onPress={() => navigation.navigate("Notifications")}
            style={{
              // backgroundColor:"#0f0",
              alignItems:'center',
              justifyContent:'center',
              marginTop:3
            }}
            >
            <Image source={notifysIcon} contentFit="contain" style={{width:31,height:31,alignSelf:"center"}} />
            <BadgeNotify count={1}/>
            </Pressable>

            </View>


 </View>


           <View style={style.ImageProfileStyle}>
           {userData?.image ? (
             <Image source={userData?.image} contentFit="contain" style={{width:95,height:95,borderRadius:50}} />
            ) : (
              <>
              <View 
              style={{
                width:95,
                height:95,
                borderRadius:50,
                backgroundColor:colors.whiteLight,
                alignItems:"center",
                justifyContent:"center"}}
              >
             <Image source={noperson} contentFit="contain" style={{width:95,height:95,borderRadius:50}} />
             </View>
              </>
            )}
          </View>

       <View
       style={[style.NameView,{
  flexDirection:isArabic?"row-reverse":"row",

       }]}>
           <Text style={[globalStyle.AbelFont, style.NameTextStyle]}>
                     {userData?.username ? userData?.username : isArabic ? "اسم الراكب" : " Rider's Name"}  
                      </Text>
                      
             <Image source={Verifiedtick} contentFit="contain" style={[style.IconVerficationStlye,{
                 marginLeft: isArabic ? 0 : 5,
                 marginRight: isArabic ? 5 : 0
             }]} />
         </View>

 </View>

 <View style={style.contentContainer}>
 <PersonalInfo />
 </View>
 </View>
  
      
    </>
  );
};

export default ProfileSettings;

const style = StyleSheet.create({
  containerInfo: {
    width: "100%",
    height: 260,
    backgroundColor: colors.mainColor,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBgIcon: {
    width: "100%",
    right: "-0.12%",
    left: "0.12%",
    height: 260,
    top: 0,
  },
  iconLayout1: {
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },

  IconsHeaderView : {
    top:50,
    paddingHorizontal:25,
    width:'100%',
    position:"absolute",
    // backgroundColor:"#0f0",
    justifyContent:"space-between",
  },
  IconsStyle:{
    width:35,height:35, 
  },
  ImageProfileStyle:{
    padding:10,
    // backgroundColor:"#ff0",
    alignSelf:"center",
   justifyContent:'center' ,
   top:Platform.OS === "ios" ? 42 : 22
  // marginTop:20
   
},
NameView:{
  top:Platform.OS === "ios" ? 62 : 32,
  // backgroundColor:"#00f",
  alignSelf:"center",
  justifyContent:"center",

},
  NameTextStyle:{
    textAlign: "center",
    color:colors.whiteLight,
    fontSize:18
  },
  IconVerficationStlye:{
    width:20,
    height:20, 
    alignSelf:'center',
    // marginRight: 5,
 
    },
  ButtonChangeTextStyle: {
    textAlign: "center",
    fontSize: 16,
  },
 
  textMainStyle:{
            // backgroundColor:"#00f",
            padding:10,
            marginTop:10
  },
  circle:{
    
    width:14,
    height:14,
    borderRadius:7,  
    backgroundColor:colors.countBackground,
    alignItems:"center",
    justifyContent:'center',
    alignSelf:'flex-end',
    marginTop:-10
   },
   count:{
    color:colors.countColorRed,
    fontSize:11
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -2,
    backgroundColor: colors.countBackground,
    borderRadius: 7,
    width: 13,
    height: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.countColorRed,
    fontSize: 10,
  },
  IconHaeder:{
      width:45,
      height:45, 
      backgroundColor:colors.white,
      borderRadius:25,
      justifyContent:'center',
      alignItems:'center',
      // marginLeft:10
    },
    badgeContainerNotify: {
      position: "absolute",
      top: -5,
      right: 2,
      backgroundColor: colors.light,
      borderRadius: 7,
      width: 13,
      height: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    badgeTextNotify: {
      color: colors.colorDarkcyan,
      fontSize: 10,
    },
  
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // marginBottom: 10,

  },
});
