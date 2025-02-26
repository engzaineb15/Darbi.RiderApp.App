import React,{useState,useRef,useEffect,useMemo} from "react";
// import {  } from "expo-image";
import { Dimensions, Platform, Pressable, ScrollView, StyleSheet,Image, Text, TouchableOpacity, View } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../../../GlobalStyles";
import { useLanguage } from "../../../LanguageContext";
import { globalStyle } from '../../utils/GlobalStyle/index';
import LottieView from 'lottie-react-native';
import useApi from "../../Api/useApi";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, lodaingSpinner } from "../../utils/Images";
import utils from "../../utils";
import { UserLogOut } from "../../redux/user";
import { colors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
const { height ,width} = Dimensions.get('window');

interface Notification {
  createdAt: string;
  title: string;
  message: string;
  seen: boolean;
}

const Notifications = () => {
  const token = useSelector((state: any) => state.user.token);
  const userData = useSelector((state: any) => state.user.userData);
  const animation = useRef(null)
  const { get } = useApi();
  const { put } = useApi();
  const { t, isArabic } = useLanguage();
  const [loading, setLoading] = useState<boolean>(true);
  const [todayNotifications, setTodayNotifications] = useState<Notification[]>([]);
  const [yesterdayNotifications, setYesterdayNotifications] = useState<Notification[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [notificationsLoading, setNotificationsLoading] = useState(true);

  const todayDate = useMemo(() => new Date(), []);
  const yesterdayDate = useMemo(() => {
    const date = new Date(todayDate);
    date.setDate(todayDate.getDate() - 1);
    return date;
  }, [todayDate])


  useEffect(() => {
    if (token) {
      fetchNotifications();
      markNotificationsAsSeen();
    }
  }, [token]);

  const markNotificationsAsSeen = async () => {
    setLoading(true)
    try {
      await put("notifications/seen", {});
      setLoading(false)
      // console.log("Notifications marked as seen successfully");
    } catch (error: any) {
      // console.error("Failed to mark notifications as seen:", error.response?.data || error.message);
      setLoading(false)
    }
  };

  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    setLoading(true);
    try {
      const response = await get("notifications");
      const notifications: Notification[] = response?.data?.data;
      const today: Notification[] = [];
      const yesterday: Notification[] = [];

      notifications.forEach(notification => {
        const notificationDate = new Date(notification.createdAt);
        if (isSameDay(notificationDate, todayDate)) {
          today.push(notification);
        } else if (isSameDay(notificationDate, yesterdayDate)) {
          yesterday.push(notification);
        }
      });
      
      setTodayNotifications(today);
      setYesterdayNotifications(yesterday);
    } catch (error: any) {
      if (error.response?.data?.message === 'jwt expired') {
        utils.toastAlert('error', t('Session expired. Please log in again.'));
        dispatch(UserLogOut());
      } else {
        // console.error("Failed to fetch notifications:", error.response?.data || error.message);
      }
    } finally {
      setLoading(false);
      setNotificationsLoading(false);
    }
  };


  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };



  return (
    <View style={styles.mainView}>
    
       <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

       <View style={[styles.signInParent, styles.signInParentSpaceBlock, {
          alignItems: isArabic ? "flex-end" : "flex-start",
    marginTop: Platform.OS === "ios" ? 100 : 50,

        }]}>

    <View style={{ ...styles.container_btn_PageName, 
    flexDirection: isArabic ? "row-reverse" : "row",

    }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[{ ...styles.btnBack ,
    transform: [{ rotateY: isArabic ?  "0deg" : "180deg" }],

            }]}
          >
            <Image source={ArrowLeft} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={[styles.bagsName, globalStyle.AbelFont,]}>
            {t('Notifications')}
          </Text>
       
      </View> 
      <Text style={styles.signUp}>{t('All_your_notifications')}</Text>

</View>
  
        {notificationsLoading ? (
            <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 100,
          height: 100,
          alignSelf:"center",
          justifyContent:"center",
          flex:1
        }}
        source={lodaingSpinner}
      />
     
        ) : (
          <>
 
 {todayNotifications.length === 0 && yesterdayNotifications.length === 0 ? (
              <View style={styles.noNotificationsContainer}>
                <Text style={styles.noNotificationsText}>{t('No_notifications')}</Text>
              </View>
            ) : (
    

    <View style={styles.activityParent}>
 
      <NotificationSection
        title={t('Today')}
        notifications={todayNotifications}
        isArabic={isArabic}
        t={t}
        
      />
   
      <NotificationSection
        title={t('Yesterday')}
        notifications={yesterdayNotifications}
        isArabic={isArabic}
        t={t}
        
      />
    
  </View>
        )}
        </> 
        )}

      </ScrollView>
    </View>
  );
};


const NotificationSection = ({ title, notifications, isArabic, t }: any) => (
  <View style={styles.activityLayout}>
    <Text style={[styles.title, globalStyle.AbelFont, { textAlign: isArabic ? 'right' : 'left' }]}>
      {title}
    </Text>
    {notifications?.length > 0 ? (
      notifications.map((notification: Notification, index: number) => (
        <View key={index} style={[styles.changeShadowBox, {
          flexDirection: isArabic ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }]}>
          <Image
            style={styles.frameChild}
            resizeMode="cover"
            source={require("../../Assets/imgs/Home/logoPhoto1.png")}
          />
          <View style={[styles.notificationContentWrapper,{
    marginRight:isArabic?10:0,
    marginLeft:isArabic?0:10,

          }]}>
            <View style={[styles.notificationContent, {
              alignItems: isArabic ? 'flex-end' : 'flex-start',
            }]}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.doYouWant, globalStyle.AbelFont, {
                textAlign: isArabic ? 'right' : 'left',
              }]}>
                {notification?.title}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, globalStyle.AbelFont, {
                textAlign: isArabic ? 'right' : 'left',
              }]}>
                {notification?.message}
              </Text>
            </View>
          </View>
          <Pressable style={[styles.selectionBlue, {
            backgroundColor: notification?.seen ? Color.colorGrey400 : Color.colorLightcyan,
          }]}>
            <Text style={[styles.stocks, {
              color: notification?.seen ? 'black' : Color.colorDarkcyan,
            }]}>{t('Details')}</Text>
          </Pressable>
        </View>
      ))
    ) : (
      <Text style={[styles.noNotificationsText, { textAlign: isArabic ? 'right' : 'left' }]}>
        {title === t('Today') ? t('No_notifications_today') : t('No_notifications_yest')}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
   
  container_btn_PageName: {
    alignItems: "center",
  },
  btnBack: {
    backgroundColor: colors.btnBack,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "flex-start",
    shadowColor: colors.black,
    elevation: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginRight: 1.7,
    borderWidth: 0.5,
   
  },
  bagsName: {
    marginHorizontal: 10,
    fontSize: 22,
  
  },
  statusBarFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeTypo: {
    textAlign: "center",
  },
  borderPosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  timePosition: {
    top: "50%",
    position: "absolute",
  },
  signInParentSpaceBlock: {
    paddingVertical: 0,
    justifyContent: "center",
  },
  textTypo: {
    // fontFamily: FontFamily.abelRegular,
  },
  activityLayout: {
    width: width * 0.9,
    // backgroundColor:"#0f0",
    alignItems: "center",
  },
  money2Icon: {
    top: 263,
    left: 203,
    width: 24,
    height: 24,
    position: "absolute",
  },
  time: {
    marginTop: -10.5,
    fontSize: FontSize.size_mid,
    lineHeight: 22,
    color: Color.colorGray_200,
    letterSpacing: 0,
    top: "50%",
    position: "absolute",
    width: 54,
    left: 0,
  },
  timeIphone: {
    height: 21,
    zIndex: 0,
    width: 54,
  },
  border: {
    width: "91.58%",
    right: "8.42%",
    left: "0%",
    borderRadius: Border.br_9xs_5,
    borderStyle: "solid",
    borderColor: Color.colorGray_200,
    borderWidth: 1,
    opacity: 0.35,
  },
  capIcon: {
    height: "30.77%",
    width: "4.76%",
    top: "36.15%",
    right: "0%",
    bottom: "33.08%",
    left: "95.24%",
    maxWidth: "100%",
    maxHeight: "100%",
    opacity: 0.4,
    position: "absolute",
    overflow: "hidden",
  },
  capacity: {
    height: "69.23%",
    width: "76.92%",
    top: "15.38%",
    right: "15.75%",
    bottom: "15.38%",
    left: "7.33%",
    borderRadius: 1,
    backgroundColor: Color.colorGray_200,
    position: "absolute",
  },
  battery: {
    width: "34.87%",
    right: "0.13%",
    left: "65.01%",
  },
  wifiIcon: {
    width: 17,
    height: 12,
  },
  cellularConnectionIcon: {
    width: 19,
    height: 12,
  },
  cellularwifibatteryIphone: {
    width: 78,
    height: 13,
    zIndex: 1,
  },
  floatingIsland: {
    marginTop: -15.5,
    marginLeft: -63,
    left: "50%",
    borderRadius: Border.br_lg_5,
    backgroundColor: Color.darkBlackPrimary,
    width: 127,
    height: 37,
    zIndex: 2,
  },
  statusBar: {
    top: 0,
    width: 430,
    paddingLeft: Padding.p_8xl,
    paddingTop: Padding.p_lg,
    paddingRight: Padding.p_7xl,
    paddingBottom: Padding.p_sm,
    left: 0,
    position: "absolute",
  },
  signIn: {
    fontSize: FontSize.size_3xl,
    lineHeight: 30,
    color: Color.colorDark2,
    
  },
  signUp: {
    lineHeight: 18,
    color: Color.colorDimgray_100,
    marginTop: 12,
    // textAlign: "right",
    fontSize: FontSize.size_sm,
  
    letterSpacing: 0,
    // backgroundColor:"#00f"
   
  },
  signInParent: {
    // top: 75,
    right: 0,
    paddingHorizontal: Padding.p_base,
    // position: "absolute",
    // backgroundColor:"#00f"
  },
  title: {
    lineHeight: 24,
    color: Color.greyscale400,
    alignSelf: "stretch",
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    padding:10,
    // backgroundColor:"#f0f",
    // marginTop:30

  },
  stocks: {
    lineHeight: 25,
    fontSize: FontSize.size_sm,
    
  },

  doYouWantToReceiveNotificParent: {
    // backgroundColor:"#0f0",
    // paddingHorizontal:5,
    
  },

  frameParent: {
    // width: 226,
    // justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor:"#ff0",
    
  },
  selectionBlueParent: {
    alignSelf: "stretch",
  },
  changePinInner: {
    justifyContent: "center",
    // backgroundColor:"#0f0",
    flex: 1,
    
    
  },
  text: {
    fontSize: 12,
    lineHeight: 20,
    color: Color.appColorSubtitle,
    marginTop: 4,
  },
   scrollViewContent: {
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeShadowBox: {
    marginVertical: 10,
    padding: 10,
    borderRadius: Border.br_xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Color.baseWhite,
    flexDirection: 'row',
  },
  notificationContentWrapper: {
    flex: 1,
  },
  notificationContent: {
    flex: 1,
  },
  buttonImageWrapper: {
    alignItems: 'center',
  },
  selectionBlue: {
    borderRadius: Border.br_49xl,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  frameChild: {
    width: 30,
    height: 30,
  },
  doYouWant: {
    fontSize: 15,
    color: Color.darkBlackPrimary,
  },

  activity1: {
    // marginTop: 22,
  },
  activityParent: {
    // backgroundColor:"#00f",
    alignSelf:"center",
    justifyContent:"center",
    // top:60
   marginTop: Platform.OS === "ios" ? 40 : 20,


  },
  view: {
    // width: "100%",
    // alignItems:"center",
    // justifyContent: "center",
    // overflow: "hidden",
    flex: 1,
    // paddingHorizontal:20,
    backgroundColor: Color.baseWhite,
  },
  mainView:{
    flex: 1,
    backgroundColor: Color.baseWhite,
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsText: {
    fontSize: FontSize.size_xl,
    color: Color.colorGray_500,
    marginVertical:10
  },
  noNotificationstoday: {
    fontSize: 13,
    color: Color.colorGray_500,
  },
});

export default Notifications;
