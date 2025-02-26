import React from 'react';
import { View, Text, Platform, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../../utils/colors';
import { animle, closecircle, collaboration1Icon, disable, music, numofridersIcon, smoke, tickcircle, whiteMony } from '../../utils/Images';
import { globalStyle, responsiveWidth } from '../../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../../../LanguageContext';
const { width, height } = Dimensions.get('window');


const AdditionalInfo = ({ myContractDetails, t, isArabic }: any) => {

  const Music = myContractDetails?.music;
  const serviceForDisability = myContractDetails?.serviceForDisability;


  return (
    <>
      <View style={{ marginTop: 20 }}>
        <Text style={[{ fontSize: 17 }, globalStyle.AbelFont]}>
          {' '}{t('Other_services')}{' '}
        </Text>
      </View>

      <View style={[styles.servicesContainer, {}]}>

        <View style={[styles.serviceItem, {
          alignItems: isArabic ? 'flex-end' : 'flex-start',
        }]}>
          <View style={[styles.IconStyle, { alignSelf: isArabic ? 'flex-end' : 'flex-start' }]}>
            <Image source={music} contentFit="contain" style={styles.serviceIcon} />
          </View>
          <Text style={[styles.lastMessage, globalStyle.AbelFont, styles.serviceLabel, {
            alignSelf: isArabic ? "flex-end" : "flex-start",
          }]}>
            {t('OtherServicesTwo')}
          </Text>
          <View style={[
            styles.availabilityContainer,
            {
              flexDirection: isArabic ? 'row-reverse' : 'row',
              backgroundColor: Music ? colors.ligthGrenn2 : colors.redlight,

            }
          ]}>
            <Image
              source={Music ? tickcircle : closecircle}
              contentFit="contain"
              style={[styles.availabilityIcon, {
                marginLeft: isArabic ? 3 : 0,
                marginRight: isArabic ? 0 : 3,
              }]}
            />
            <Text style={[globalStyle.AbelFont, styles.availabilityText,
            { color: Music ? colors.greenText : colors.lightred }
            ]}>
              {Music ? t('availableed') : t('notAvailableed')}
            </Text>
          </View>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    width: responsiveWidth(345),
    //   marginHorizontal: 5,
    // paddingHorizontal:10,
    paddingVertical: 15,
    // padding: 5,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(238, 238, 238, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#FFF",
    alignSelf: 'center',
    marginTop: 20,
    // alignItems:'center'

  },
  serviceItem: {
    width: '28%',
    // backgroundColor:"#0f0",
    // width: '48%',
    marginBottom: 10,

  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 15,
    height: 15,
  },
  serviceLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
  },
  availabilityContainer: {
    borderRadius: 5,
    marginTop: 5,
    justifyContent: "center",
    alignItems: 'flex-end',
    padding: 2,
  },
  availabilityIcon: {
    width: 15,
    height: 15,

  },
  availabilityText: {
    fontSize: 12,
  },

  card: {
    width: responsiveWidth(350),
    //   marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    padding: 5,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(238, 238, 238, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#FFF",
    alignSelf: 'center',

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
    // borderRadius: 25,
    marginLeft: 10,
  },
  details: {
    flex: 1,
    paddingHorizontal: 10,
    marginRight: 5

  },
  name: {
    fontSize: 13,
    // fontWeight: 'bold',
    // lineHeight: 25,
    // marginLeft: 8,
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
export default AdditionalInfo;
