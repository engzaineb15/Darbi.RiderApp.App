import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from 'react-i18next';
import { globalStyle } from "../utils/GlobalStyle";
import { AuthIcon_ar, AuthIcon_en, IconApp } from "../utils/Images";
import { colors } from "../utils/colors";

type AuthLayoutType = {
  children?: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutType> = ({ children }: AuthLayoutType) => {
  const { t } = useTranslation();

  return (
    <View style={{  ...styles.container }}>
        <View  style={styles.MainView}>
      <Image
            source={IconApp}
            contentFit="contain"
            style={[styles.iconSplash]}
          />
           <Text style={[globalStyle.AbelFont,styles.headerText]}>
                  {t("Darbi")}{" "}
                </Text>
                <Text style={[globalStyle.AbelFont,styles.DescText]}>
                  {t("DescriptionOfAuth")}{" "}
                </Text>
                </View>
      {children}
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLayout: {
  },
  MainView:{
    marginBottom: 150,
    // backgroundColor:"#0f0",
    justifyContent: "center",
      alignItems: "center",
  },
  iconSplash: {
    width: 90,
    height: 90,
  },
  headerText:{
    color:colors.white,
    fontSize:25,
    marginTop:10,
    // fontWeight:'bold'
  },
  DescText:{
    color:colors.white,
    fontSize:20,
    lineHeight:30
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
