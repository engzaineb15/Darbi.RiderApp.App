import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Platform,
  I18nManager,
 
} from "react-native";
import { colors } from "../utils/colors";
import i18n from "../i18n";
import { useLanguage } from "../../LanguageContext";
import { Image } from "expo-image";


type CustomInputProps = {
  children?: React.ReactNode;
  ContainerInputStyle?: StyleProp<ViewStyle>;
  showStar?: boolean;
  IconsService?: any;
};

const CustomInput: React.FC<CustomInputProps & TextInputProps> = ({
  children,
  ContainerInputStyle,
  placeholder,
  showStar = false,
  IconsService,
  ...props
}) => {

  const {t, changeLanguage, isArabic } = useLanguage();
  const composedPlaceholder = showStar ? `${placeholder} * ` : placeholder;

  return (
    <View style={[styles.textInputStyle, ContainerInputStyle,{
      flexDirection: isArabic  ? 'row':'row-reverse',
    }]}>
      
      <TextInput
        
        textAlign={ isArabic  ? "right" : 'left' }
        placeholder={composedPlaceholder}
        {...props}
      />

<Image
            source={IconsService}
            contentFit="contain"
            style={{
               width: 24, height: 24 ,
               marginHorizontal: 8,

            }}
          />
      
      {children}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textInputStyle: {
    // backgroundColor: "#0f0",
    color: colors.black,
    borderWidth: 0.68,
    borderColor: colors.bordercolor,
    // backgroundColor: colors.white,
    padding: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 12,
    overflow: "hidden",

    alignItems: "center",
  },
});
