import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  View,
} from "react-native";
import { bgWhiteImage, camera } from "../utils/Images";
import { colors } from "../utils/colors";
import * as ImagePicker from "expo-image-picker";
import { globalStyle } from "../utils/GlobalStyle";
import { useTranslation } from "react-i18next";


type ContainerAddImagetype = {
  TextDecContainerImage?: string;
  Icon?: ImageSourcePropType;
  handleOpenImagePicker?: () => void;
  image?: any;
};

const ContainerAddImage: React.FC<ContainerAddImagetype> = ({
  TextDecContainerImage,
  Icon,
  handleOpenImagePicker,
  image,
}) => {
  const { t } = useTranslation();

  return (
    <Pressable onPress={handleOpenImagePicker} style={styles.containerAddImage}>
      {image ? (
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          style={styles.profileImage}
        />
      ) : (
        <ImageBackground
          source={bgWhiteImage}
          resizeMode="contain"
          style={styles.containerIconImage}
        >
          <Image source={Icon} resizeMode="contain" />
        </ImageBackground>
      )}
      {image ? (
        <View style={styles.btnChangeImage}>
          <Text
            style={[
              styles.decContainerImage,
              globalStyle.AbelFont,
              { marginTop: 0 },
            ]}
          >
           {t("addPhoto")}
          </Text>
        </View>
      ) : (
        <Text style={[styles.decContainerImage, globalStyle.AbelFont]}>
          {TextDecContainerImage}
        </Text>
      )}
    </Pressable>
  );
};

export default ContainerAddImage;
const styles = StyleSheet.create({
  containerAddImage: {
    backgroundColor: colors.containerImage,
    width: 155,
    height: 133.5,
    borderRadius: 16.5,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  containerIconImage: {
    width: 73,
    height: 74,
    justifyContent: "center",
    alignItems: "center",
  },
  decContainerImage: {
    color: colors.mainColor,
    fontSize: 14,
    marginTop: 10,
  },
  profileImage: { width: 115, height: 115, borderRadius: 100 },
  btnChangeImage: {
    width: "100%",
    height: 40,
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    opacity: 0.9,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
