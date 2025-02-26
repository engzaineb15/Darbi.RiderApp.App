import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  I18nManager,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Modalize from "../../components/Modalize";
import AuthLayout from "../../layouts/AuthLayout";
import { globalStyle } from "../../utils/GlobalStyle";
import { colors } from "../../utils/colors";
import useApi from "../../Api/useApi";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import utils from "../../utils";
import i18n from "../../i18n";
import { useLanguage } from "../../../LanguageContext";
import { Color, FontSize } from "../../../GlobalStyles";
import { callCalling } from "../../utils/Images";

interface AuthPageProps {
  navigation: any;
}

const AuthPage: React.FC<AuthPageProps> = ({ navigation }) => {
  const { t, changeLanguage, isArabic } = useLanguage();
  const { width } = useWindowDimensions();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [phoneOrEmailLogin, setPhoneOrEmailLogin] = useState<string>("");
  const [EmailSignUp, setEmailSignUp] = useState<string>("");
  const [isFocused2, setIsFocused2] = useState<boolean>(false);
  const [PhoneNumSignUp, setPhoneNumSignUp] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const { post_Without_Token } = useApi();
  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    setIsFocused(false);
  };

  const handleFocus2 = (): void => {
    setIsFocused2(true);
  };

  const handleBlur2 = (): void => {
    setIsFocused2(false);
  };


  const saudiPhoneRegex = /^(05\d{8}|9665\d{8})$/;
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleLogin = () => {
    // ..
  };

  const handleRegister = () => {
    // ..
  };


  const LoginFun = () => (
    <>

      <TouchableOpacity
        onPress={() => {
          changeLanguage(i18n.language.includes('ar') ? 'en' : 'ar')
        }}
        style={{
          backgroundColor: colors.light,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 8,

        }}
      >
        <Text style={[globalStyle.AbelFont, styles.doYouWant, {
          textAlign: isArabic ? "right" : "left",
        }]}>
          {isArabic ? "AR" : "EN"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.loginText, globalStyle.AbelFont, { alignSelf: isArabic ? "flex-end" : "flex-start" }]}>{t("login")}</Text>


      <Text style={[styles.decLoginText, globalStyle.AbelFont, { alignSelf: isArabic ? "flex-end" : "flex-start" }]}>{t("Welcome_1")}</Text>

      <View style={[styles.containerNavigation, { flexDirection: isArabic ? "row" : 'row-reverse' }]}>
        <CustomButton
          onPress={() => setIsLogin(true)}
          style={[globalStyle.buttonBorderStyle, { width: width * 0.43, backgroundColor: colors.light }]}
          buttonText={t("logIn")}
          textStyle={[styles.NavigationBtnText, { color: colors.textforlog }]}
        />
        <CustomButton
          onPress={() => setIsLogin(false)}
          style={[globalStyle.buttonBorderStyle, { width: width * 0.43, backgroundColor: colors.whiteLight }]}
          buttonText={t("SignUp")}
          textStyle={[styles.NavigationBtnText, globalStyle.AbelFont, { color: colors.gray }]}
        />
      </View>

      <CustomInput
        placeholder={t("phoneOrEmailLogin")}
        value={phoneOrEmailLogin}
        onChangeText={(value: string) => setPhoneOrEmailLogin(value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ContainerInputStyle={[styles.InputStyle, isFocused && { borderColor: colors.mainColor }]}
        style={[globalStyle.AbelFont, { width: "95%" }]}
        IconsService={callCalling}

      >

      </CustomInput>



      <CustomButton
        onPress={handleLogin}
        style={[globalStyle.buttonStyle, styles.btn, { width: width * 0.9, backgroundColor: phoneOrEmailLogin ? colors.mainColor : colors.graybtn }]}
        buttonText={t("RegisterNow")}
        textStyle={[styles.textButton, globalStyle.AbelFont]}
        loading={loadingLogin}
        disabled={loadingLogin}
      />
    </>
  );

  const SignUpFun = () => (
    <>

      <View
        style={{
          flexDirection: isArabic ? "row" : 'row-reverse',
          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor:"#0f0",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            changeLanguage(i18n.language.includes('ar') ? 'en' : 'ar')
          }}
          style={{
            backgroundColor: colors.light,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 8,

          }}
        >
          <Text style={[globalStyle.AbelFont, styles.doYouWant, {
            textAlign: isArabic ? "right" : "left",
          }]}>
            {isArabic ? "AR" : "EN"}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.loginText, globalStyle.AbelFont, { alignSelf: isArabic ? "flex-end" : "flex-start" }]}>
          {t("RegisterNew")}
        </Text>

      </View>
      {/* */}
      <Text style={[styles.decLoginText, globalStyle.AbelFont, { alignSelf: isArabic ? "flex-end" : "flex-start" }]}>
        {t("Welcome_2")}{" "}
      </Text>

      <View style={[styles.containerNavigation, {
        flexDirection: isArabic ? "row" : "row-reverse",

      }]}>
        <CustomButton
          onPress={() => setIsLogin(true)}
          style={[globalStyle.buttonBorderStyle, { width: width * 0.43, backgroundColor: colors.whiteLight }]}
          buttonText={t('logIn')}
          textStyle={[styles.NavigationBtnText, globalStyle.AbelFont, { color: colors.grayBtn }]}
        />
        <CustomButton
          onPress={() => setIsLogin(false)}
          style={[globalStyle.buttonBorderStyle, { width: width * 0.43, backgroundColor: colors.light }]}
          buttonText={t("SignUp")}
          textStyle={[styles.NavigationBtnText, globalStyle.AbelFont, { color: colors.textforlog }]}
        />
      </View>

      <CustomInput
        placeholder={t("EmailSignUp")}
        value={EmailSignUp}
        onChangeText={(value: string) => setEmailSignUp(value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ContainerInputStyle={[styles.InputStyle, isFocused && { borderColor: colors.mainColor }]}
        style={[globalStyle.AbelFont, { width: "95%" }]}
        IconsService={callCalling}

      >

      </CustomInput>

      <CustomInput
        placeholder={t("PhoneSignUp")}
        value={PhoneNumSignUp}
        onChangeText={(value: string) => setPhoneNumSignUp(value)}
        onFocus={handleFocus2}
        onBlur={handleBlur2}
        ContainerInputStyle={[styles.InputStyle, isFocused2 && { borderColor: colors.mainColor }]}
        style={[globalStyle.AbelFont, { width: "95%" }]}
        IconsService={callCalling}

      >



      </CustomInput>


      <CustomButton
        onPress={handleRegister}
        style={[globalStyle.buttonStyle, styles.btn, { width: width * 0.9, backgroundColor: EmailSignUp.length > 0 && PhoneNumSignUp.length > 0 ? colors.mainColor : colors.graybtn }]}
        buttonText={t('RegisterNow')}
        textStyle={[styles.textButton]}

        loading={loadingRegister}
        disabled={loadingRegister}
      />
    </>
  );

  return (
    <AuthLayout>

      <Modalize>{isLogin ? LoginFun() : SignUpFun()}</Modalize>

    </AuthLayout>
  );
};

export default AuthPage;

const styles = StyleSheet.create({
  loginText: {
    fontSize: 22,
    marginVertical: 10,
    color: colors.black,
  },
  changeLangText: {
    fontSize: 19,
    marginVertical: 10,
    color: colors.black,
  },
  doYouWant: {
    fontSize: 17,
    color: Color.darkBlackPrimary,
    lineHeight: 30,

  },
  decLoginText: {
    fontSize: 13,
    color: colors.gray,
  },
  textButton: {
    color: colors.white,
    fontSize: 16,
  },
  btn: {
    marginVertical: 20,
  },
  containerNavigation: {
    // backgroundColor:"#0f0",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  NavigationBtnText: {
    fontSize: 14,
  },
  InputStyle: {
    // backgroundColor: "#ff0",
    marginTop: Platform.OS === "ios" ? 20 : 10,
    overflow: "hidden",
    paddingTop: Platform.OS === "ios" ? 10 : 10,
  },
  IconStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
});
