import { StyleSheet } from "react-native";
import { colors } from "../colors";
import {Dimensions} from 'react-native';

const heightMobileUI = 844;
const widthMobileUI = 390;

export const responsiveWidth = (width: number) => {
  return (Dimensions.get('window').width * width) / widthMobileUI;
};

export const responsiveHeight = (height: number) => {
  return (Dimensions.get('window').height * height) / heightMobileUI;
};

export const globalStyle = StyleSheet.create({
  basicContainer: {
    flex: 1,
    backgroundColor: colors.mainColor,
  },
  Container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
  basicContainerWhiteBg: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  basicContainerNotCenter: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerAlgin: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    // width :200
    alignSelf: "center",
    borderRadius: 20,
  },
  buttonBorderStyle: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    // width :200
    alignSelf: "center",
    borderRadius: 10,
  },

  textButton: {
    color: colors.white,
    fontSize: 16,
  },
  btn: {
    marginVertical: 20,
  },
  AbelFont: { fontWeight: "400", fontFamily: "Abel" },
});
