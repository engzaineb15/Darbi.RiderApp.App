import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  I18nManager,
  StyleProp,
  ViewStyle,
} from "react-native";
import { colors } from "../utils/colors";
import { arrowDown } from "../utils/Images"; // Assuming you have these images in your utils/Images file
import { globalStyle } from "../utils/GlobalStyle";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useLanguage } from "../../LanguageContext";

const isArabic = i18n.language === "ar";

type CustomDropDownListType = {
  children?: React.ReactNode;
  ContainerInputStyle?: StyleProp<ViewStyle>;
  textService?: string;
  Service?: string;
  IconsService?: any;
  showArrow?: boolean; // New prop
};

const CustomDropDownList: React.FC<CustomDropDownListType & TouchableOpacityProps> = ({
  children,
  ContainerInputStyle,
  textService,
  IconsService,
  Service,
  showArrow = true, // Default to true
  ...props
}) => {
  
  const {t, changeLanguage, isArabic} = useLanguage();

  return (
    <>
      <TouchableOpacity
        style={[styles.textInputStyle, ContainerInputStyle,{
    flexDirection: isArabic ? "row-reverse" : "row",
    textAlign: isArabic ? "right" : "left",
     
        }]}
        {...props}
      >
        <View style={[styles.row,{
    flexDirection: isArabic ? "row" : "row-reverse",
        }]}>
          <Text style={styles.star}>*</Text>
          <Text style={[globalStyle.AbelFont, styles.textDrowpDown]}>
            {textService}
            {Service}
            {""}
          </Text>
          <Image
            source={IconsService}
            contentFit="contain"
            style={{ width: 25, height: 25 }}
          />
        </View>
        {showArrow && (
          <Image
            source={arrowDown}
            contentFit="contain"
            style={{ width: 18, height: 18, 
             marginLeft:isArabic?0:5,
             marginRight:isArabic?5:0
             }}
          />
        )}
        {children}
      </TouchableOpacity>
    </>
  );
};

export default CustomDropDownList;

const styles = StyleSheet.create({
  textInputStyle: {
    color: colors.placeholderColor,
    borderWidth: 0.68,
    borderColor: colors.bordercolor,
    backgroundColor: colors.white,
    padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  row: {
    alignItems: "center",
    textAlign: "right",
  },
  star: {
    color: colors.star,
  },
  textDrowpDown: {
    fontSize: 11,
    marginHorizontal: 5,
    color: colors.grayBtn,
  },
});
