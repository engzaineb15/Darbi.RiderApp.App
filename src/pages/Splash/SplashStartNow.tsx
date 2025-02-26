
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
  Text
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { globalStyle } from "../../utils/GlobalStyle";
import { IconApp, SplashStartNowBg } from "../../utils/Images";
import { colors } from "../../utils/colors";
import MySwiper from "./Swiper";
import MyCarousel from "./Swiper";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../LanguageContext";

const SplashStartNow: React.FC = ({ navigation }: any) => {
  const { width } = useWindowDimensions();
  const {t, changeLanguage, isArabic} = useLanguage();
  const data = [
    require("../../Assets/imgs/Auth/iPhone.png"),
    require("../../Assets/imgs/Auth/iPhone.png"),
    require("../../Assets/imgs/Auth/iPhone.png"),
    require("../../Assets/imgs/Auth/iPhone.png"),
    require("../../Assets/imgs/Auth/iPhone.png"),
  ];
  return (
    <>
      <View style={globalStyle.basicContainer}>
        <Image source={IconApp} style={styles.IconApp} resizeMode="contain" />
        <MyCarousel data={data} />
        <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop:Platform.OS === "ios" ? 40 : 15,
        }}>
        <Text
          style={[globalStyle.AbelFont, { textAlign: "center",color:colors.white, fontSize: 20,
          }]}
        >{t('SplashFirstSentence')}</Text>
        <Text
          style={[globalStyle.AbelFont, { textAlign: "center",color:colors.white, fontSize: 16,
          }]}
        >{t('SplashSecondSentence')}</Text>
        </View>
        <CustomButton
          onPress={() => navigation.navigate("StartApp")}
          style={[globalStyle.buttonStyle, styles.btn, { width: width * 0.9 }]}
          buttonText={t('StartNow')}
          textStyle={[styles.textButton]}
        />
      </View>
    </>
  );
};
export default SplashStartNow;

const styles = StyleSheet.create({
  IconApp: {
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? 80 : 30,
  },
  StartNowBg: {
    alignSelf: "center",
    marginTop: 20,
  },

  textButton: {
    color: colors.mainColor,
    fontSize: 16,
  },
  btn: {
   marginVertical: 20,
  },
});



