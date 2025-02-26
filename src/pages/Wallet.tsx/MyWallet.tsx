import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  I18nManager,
  Alert
} from "react-native";
import { globalStyle } from "../../utils/GlobalStyle";
import { WalletIcon, addAdvertisement, Gradient, advertisement, lodaingSpinner } from "../../utils/Images";
import { colors } from "../../utils/colors";
import { Image, ImageBackground } from "expo-image";
import { FontFamily, FontSize, Color, Border, Padding } from "../../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import useApi from "../../Api/useApi";
import WalletMainComponent from "./WalletMainComponent";
import { useLanguage } from "../../../LanguageContext";

const MyWallet = () => {
  const { t, isArabic } = useLanguage();
  const { get } = useApi();
  const [loading, setloading] = useState(true);
  type ST = string | number | any;
  const [TotalMoney, setTotalMoney] = useState(0)
  const [AllTransactions, setAllTransactions] = useState([])



  const Wallet = ({
    widthWallet = 45,
    heightWallet = 50,
    moneyfontSize,
    allMoneyfontSize,
    textName,
    money = TotalMoney,
    marginLeft = 10,
  }: ST) => {
    return (
      <>
        <Image
          source={WalletIcon}
          style={{ width: widthWallet, height: heightWallet }}
          contentFit="contain"
        />
        <View>
          <Text
            style={[
              style.allMoney,
              globalStyle.AbelFont,
              { fontSize: allMoneyfontSize, marginLeft },
            ]}
          >
            {textName}{" "}
          </Text>
          <Text
            style={[
              style.money,
              globalStyle.AbelFont,
              { fontSize: moneyfontSize, marginLeft },
            ]}
          >
            {money} {t('currency')}
          </Text>
        </View>
      </>
    );
  };

  const userData = useSelector((state: any) => state.user.userData);

  return (
    <>
      <StatusBar barStyle={"light-content"} translucent={true} />
      <View style={style.MainStyle}>
        <View style={style.containerWallet}>
          <Image
            style={[style.gradientBgIcon, style.iconLayout1]}
            contentFit="cover"
            source={Gradient}
          />

          <View style={style.Bordercontainer}>
            {
              <Wallet
                whiteLight={50}
                heightWallet={50}
                moneyfontSize={30}
                allMoneyfontSize={17}
                textName={t('Wallet_balance')}
              />
            }
          </View>

          <View style={[style.flexDirectionRow,]}>

          </View>
        </View>



        <View style={style.componentContainer}>
          <WalletMainComponent AllTransactions={AllTransactions} userId={userData._id} loading={loading} />
        </View>


      </View>


    </>
  )
}

export default MyWallet;

const style = StyleSheet.create({
  MainStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerWallet: {
    width: "100%",
    height: 220,
    backgroundColor: colors.mainColor,
    justifyContent: "center",
    alignItems: "center",
  },

  flexDirectionRow: { marginHorizontal: 15, },

  Bordercontainer: {
    width: "70%",
    height: 105,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 75,
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

  allMoney: {
    color: colors.white,
    marginRight: 10,
    fontSize: 17,
  },
  money: {
    color: colors.white,
    fontSize: 30,
    marginRight: 10,
  },
  activityWrapper: {
    marginTop: -48.5,
    // left: 25,
    top: "50%",
    position: "absolute",
  }, activity: {
    width: 382,
    alignItems: "center",
  },
  changePinFlexBox: {
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center"
  },
  changePin: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  frameIcon: {
    width: 130,
    height: 107,
    overflow: "hidden",
  },
  frameParent1: {
    alignSelf: "stretch",
  },
  parentFrameFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleTypo: {
    textAlign: "right",
    fontSize: 16,
  },
  labelTypo: {
    marginTop: 4,
    textAlign: "left",
    fontSize: 12,

  },
  unpaidLayout: {
    height: 115,
    width: 291,
  },
  nameFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  doYouWant: {
    lineHeight: 22,
    color: "#000",
    textAlign: "right",
    fontSize: 16,
  },
  text3: {
    lineHeight: 19,
    color: colors.appColorSubtitle,
  },
  doYouWantToReceiveNotificParent: {
    marginTop: 12,
  },
  stocks: {
    lineHeight: 26,
    color: colors.mainColor,
    textAlign: "left",
    fontSize: 16,
  },
  selectionBlue: {
    borderRadius: 68,
    backgroundColor: colors.colorLightcyan,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginTop: 20,
  },

});
