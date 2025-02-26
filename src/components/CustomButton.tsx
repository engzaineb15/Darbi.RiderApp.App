import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from "react-native";
import { globalStyle } from "../utils/GlobalStyle";
import { colors } from "../utils/colors";  // Make sure colors are imported to use for ActivityIndicator

type CustomButtonType = {
  buttonText?: string;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode | JSX.Element;
  loading?: boolean; 
};

const CustomButton = ({
  buttonText,
  textStyle,
  children,
  loading = false,
  ...props
}: TouchableOpacityProps & CustomButtonType) => {
  return (
    <TouchableOpacity {...props} >
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text
          allowFontScaling={false}
          style={[textStyle, styles.textButton, globalStyle.AbelFont]}
        >
          {buttonText}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButton: {
    textAlign: "center",
  },
});

export default CustomButton;
