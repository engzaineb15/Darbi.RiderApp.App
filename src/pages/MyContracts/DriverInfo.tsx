import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Platform, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import { lodaingSpinner, money2, star } from '../../utils/Images';
import { colors } from '../../utils/colors';
import { globalStyle } from '../../utils/GlobalStyle';
import { useLanguage } from '../../../LanguageContext';

const { width, height } = Dimensions.get('window');

export enum ContractStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  ONHOLD = 'on_hold'
}
interface Contract {
  _id: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  departureTime: string;
  arrivalTime: string;
  startLocation: string;
  endLocation: string;
  price: number;
}

const DriverInfo = ({ loading, myContractDetails, userData }: any) => {

  const getTextStyle = () => {
    switch (myContractDetails?.status) {
      case ContractStatus.CANCELLED:
        return { color: colors.cancleS, backgroundColor: colors.cancleSback };
      case ContractStatus.EXPIRED:
        return { color: colors.finishedS, backgroundColor: colors.finishedSBack };
      case ContractStatus.PENDING:
        return { color: colors.stopS, backgroundColor: colors.stopSBack };
      case ContractStatus.ACTIVE:
        return { color: colors.activeS, backgroundColor: colors.activeSBack };
      case ContractStatus.ONHOLD:
        return { color: colors.waitingS, backgroundColor: colors.waitingSBack };

      default:
        return { backgroundColor: colors.gray16 };
    }
  };

  const getMessage = () => t(`${myContractDetails?.status}`);
  const ChangeMessage = () => t(`${myContractDetails?.status}`);
  const { t, isArabic } = useLanguage();

  if (loading) {
    return <LottieView autoPlay style={{ width: 100, height: 100, alignSelf: 'center' }} source={lodaingSpinner} />;
  }
  return (

    <>
      <View>
        <Text style={[{ fontSize: 17 }, globalStyle.AbelFont]}>
          {t('Driver_info')}
        </Text>
      </View>

      <View >

        <View style={[{ marginTop: 5, }, styles.card]}>
          <View style={[styles.chatItem, { flexDirection: isArabic ? 'row-reverse' : 'row' }]}>

            <Image source={{ uri: userData?.image }} style={[styles.avatar, {}]} />
            <View style={styles.details}>
              <View style={[styles.nametiemStyle, {
                flexDirection: isArabic ? 'row' : 'row-reverse',
              }]}>
                <View style={{ flexDirection: isArabic ? 'row-reverse' : 'row' }}>

                  <View style={[{ flexDirection: isArabic ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }]}>

                  </View>
                </View>
                <Text style={[styles.name, globalStyle.AbelFont, { color: colors.mainColor, fontSize: 17, lineHeight: 25 }]}>{myContractDetails?.driverName}</Text>
              </View>

              <View style={{ flexDirection: isArabic ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image source={money2} contentFit='contain' style={[styles.MoneyIcon, { marginLeft: isArabic ? 5 : 0, marginRight: isArabic ? 0 : 5 }]} />
                <Text style={[globalStyle.AbelFont, styles.moneytext]}>{isArabic ? `${myContractDetails.price} ريال سعودي` : `${myContractDetails?.price} SAR`}</Text>
              </View>
              <View style={[styles.SmallBoxView, { alignSelf: isArabic ? 'flex-end' : 'flex-start', backgroundColor: getTextStyle().backgroundColor }]}>
                <Text style={[globalStyle.AbelFont, styles.BoxSmallText, { color: getTextStyle().color }]}>{ChangeMessage()}</Text>
              </View>

            </View>

          </View>



        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  // ///
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
    padding: 5,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
    alignSelf: 'center'

  },
  chatItem: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  details: {
    flex: 1,
    paddingHorizontal: 10,
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

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  avatar: {
    width: 70,
    height: 65,
    borderRadius: 15,
    // borderRadius: 25,
    // marginLeft: 10,
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
    marginTop: 6,
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
  },
  moneytext: {
    fontSize: 12,
    fontWeight: '600',
  },
  MoneyIcon: {
    width: 15,
    height: 15,

  },
  SmallBoxView: {
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  BoxSmallText: {
    fontSize: 13,
    color: colors.graybtn,
  },
});
export default DriverInfo;
