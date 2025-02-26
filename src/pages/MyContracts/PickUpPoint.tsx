import React from 'react';
import { View, Text, Pressable, ImageBackground, Platform, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MapView, locationIcon, timer } from '../../utils/Images';
import { globalStyle } from '../../utils/GlobalStyle';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/ar';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../../../LanguageContext';
const { width, height } = Dimensions.get('window');


const PickUpPoint = ({ myContractDetails, }: any) => {
  const latPick = myContractDetails?.pickup?.location?.split(',')[0];
  const langPick = myContractDetails?.pickup?.location?.split(',')[1];
  const navigation = useNavigation<any>();
  const { t, isArabic } = useLanguage();
  const currentLanguage = isArabic ? 'ar' : 'en';
  moment.locale(currentLanguage);
  return (

    <>
      <Text style={[{ fontSize: 17 }, globalStyle.AbelFont]}>
        {t('Pick_up_point')}
      </Text>

      <View style={[{ marginTop: 10, }, styles.cardPoint]}>
        <View style={[styles.chatItem, { flexDirection: isArabic ? 'row-reverse' : 'row', }]}>

          <ImageBackground source={MapView} style={styles.photoMap} >
            <Pressable
              onPress={() => {

                navigation.navigate('Map', {
                  where: ' ',
                  pagetype: 'show',
                  latitude: JSON.parse(latPick),
                  longitude: JSON.parse(langPick),
                })

              }
              }
              style={{
                backgroundColor: colors.light,
                borderRadius: 5,
                paddingHorizontal: 5,
                top: Platform.OS === 'ios' ? 30 : 15,
              }}>

              <Text style={[globalStyle.AbelFont, { fontSize: 10, lineHeight: 20, color: colors.colorDarkcyan, textAlign: 'center' }]}  >{t('View_the_map')}</Text>

            </Pressable>


          </ImageBackground>
        </View>
        <View style={styles.details}>


          <View style={[styles.smallIcon]}>

            <Image source={locationIcon} contentFit="contain" style={{
              width: 20, height: 20,
            }} />
          </View>
          <Text style={[styles.lastMessage, globalStyle.AbelFont, {
            fontSize: 13, lineHeight: 20, color: colors.black,
            alignSelf: isArabic ? "flex-end" : "flex-start",
            marginLeft: isArabic ? 0 : 5,
            marginRight: isArabic ? 5 : 0
          }]} >{myContractDetails?.pickup?.name}</Text>

          <View style={[styles.smallIcon]}>

            <Image source={timer} contentFit="contain" style={{
              width: 20, height: 20,
            }} />
          </View>
          <Text style={[styles.lastMessage, globalStyle.AbelFont, {
            fontSize: 13, lineHeight: 20, color: colors.black,
            alignSelf: isArabic ? "flex-end" : "flex-start",
            marginLeft: isArabic ? 0 : 5,
            marginRight: isArabic ? 5 : 0
          }]} >{t('atHour')} {moment(myContractDetails?.startAt).format('h:mm A')}</Text>






        </View>
      </View>


    </>
  );
};

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    backgroundColor: colors.whiteLight,
  },
  containerView: {
    flex: 1,
    backgroundColor: colors.whiteLight,
    paddingHorizontal: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 80 : 40,
    height: Platform.OS === 'ios' ? 50 : 270,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    // paddingBottom: 10,
    backgroundColor: colors.mainColor,
  },
  pageName: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.white,
  },
  card: {
    width: width * 0.82,
    height: height / 8,
    // marginHorizontal:5,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(238, 238, 238, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFF",
    alignSelf: 'center'

  },
  btn: {
    marginTop: 20,
  },
  textButton: {
    color: colors.white,
    fontSize: 16,
  },
  iconLayout: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  smallCard: {
    width: width * 0.26,
    height: height / 7.8,
    paddingVertical: 5,

    paddingHorizontal: 10,
    // padding:20,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(238, 238, 238, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FFF",
    // marginTop:10,
    marginHorizontal: 5,


  },
  customViewSmall:
  {
    alignSelf: 'center',
    width: width * 0.82,
    height: height / 8,
    marginVertical: 10,
    // backgroundColor:"#00f",
    // marginHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center'


  },
  IconStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: colors.lightBackgray,

  },
  smallIcon:
  {
    width: 20,
    height: 20
  },

  CustomIcon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: colors.mainColor,

  },
  chatItem: {
    alignItems: 'center',
    // padding: 10,

  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginLeft: 10,
  },
  details: {
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 13,
    color: colors.textCutom

  },
  lastMessage: {
    fontSize: 16,
    color: '#888',
    lineHeight: 30,
    // marginLeft:10
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    // lineHeight:15
  },
  nametiemStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colors.textCutom
  },
  container_btn_PageName: {
    marginTop: 10,
  },
  bagsName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  cardPoint: {
    width: width * 0.82,
    height: height / 8,
    // marginHorizontal:5,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    // borderColor: "rgba(238, 238, 238, 1)",

    borderStyle: "solid",
    // borderWidth: 1,
    borderRadius: 15,
    backgroundColor: colors.lightBackgray,
    alignSelf: 'center'

  },
  avatarPoint: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    width: 70,
    height: 70,
    borderRadius: 25,
    // borderRadius: 25,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoMap: {
    width: 70,
    height: 70,
    borderRadius: 15,
    // borderRadius: 25,
    // borderRadius: 25,
    // marginLeft: 10,
  }
});

export default PickUpPoint;
