import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowLeft, supportIcon_en, supportIcon_ar } from "../utils/Images";
import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "../utils/GlobalStyle";
import i18n from "../i18n";
import { useLanguage } from "../../LanguageContext";
type AppBarType = {
  BagsName?: string;
  support?: boolean;
  MarginTop?: number;
  textStyle?: TextStyle;
};

const AppBar: React.FC<AppBarType> = ({ BagsName, support, MarginTop, textStyle }) => {
  const {t, changeLanguage, isArabic} = useLanguage();

  const navigation = useNavigation<any>();
  return (
    <>
      <View
        style={[
          styles.container,
          {
            flexDirection: isArabic ? "row-reverse" : "row",
            justifyContent: support ? "space-between" : isArabic ? "flex-start" : "flex-end",
            marginTop: Platform.OS === "ios" ? 50 : MarginTop ? MarginTop : 40,
          },
        ]}
      >
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
          <Text style={[styles.bagsName, globalStyle.AbelFont, textStyle]}>
            {BagsName}
          </Text>
        </View>
        {support && (
          <Pressable onPress={() => {
            navigation.navigate("SupportChatListPage")
          }}>
            <Image source={ isArabic? supportIcon_ar : supportIcon_en} resizeMode="contain" />
          </Pressable>
        )}
      </View>
    </>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    // marginTop: Platform.OS === "ios" ? 50 : 30,
  },
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
  },
  bagsName: {
    marginHorizontal: 10,
    fontSize: 16,
  
  }
});
