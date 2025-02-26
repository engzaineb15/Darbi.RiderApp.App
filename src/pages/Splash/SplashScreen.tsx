import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { GradientSplash, IconApp, splashIcon } from "../../utils/Images";
import { colors } from "../../utils/colors";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { globalStyle } from "../../utils/GlobalStyle";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import useApi from "../../Api/useApi";
import { useLanguage } from "../../../LanguageContext";


const SplachScreen = () => {
  const navigation = useNavigation<any>();
  const { t, changeLanguage, RTL } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigation.replace(Token ? 'HomeTab' : 'Choice');
      navigation.navigate('SplashStartNow')
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image
          style={[styles.gradientBgIcon, styles.iconLayout1]}
          contentFit="cover"
          source={GradientSplash}
        />
        <Animatable.View animation={"flipInY"} style={styles.MainView} >
          <Image
            source={IconApp}
            contentFit="contain"
            style={styles.iconSplash}
          />
          <Text style={[globalStyle.AbelFont, styles.headerText]}>
            {t("Darbi")}{" "}
          </Text>
          <Text style={[globalStyle.AbelFont, styles.DescText]}>
            {t("Description")}{" "}
          </Text>
        </Animatable.View>
      </View>
    </>
  );
};
export default SplachScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainColor,
    justifyContent: "center",
    alignItems: "center",
  },
  MainView: {

    justifyContent: "center",
    alignItems: "center",
  },
  iconSplash: {
    width: 90,
    height: 90,
  },
  headerText: {
    color: colors.white,
    fontSize: 25,
    marginTop: 10,
    // fontWeight:'bold'
  },
  DescText: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 30
  },
  gradientBgIcon: {
    width: "100%",
    right: "-0.12%",
    left: "0.12%",
    height: "100%",
    top: 0,
  },
  iconLayout1: {
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },

});
