import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { globalStyle } from "../../utils/GlobalStyle";
import { Image } from "expo-image";
import { colors } from "../../utils/colors";
import CustomInput from "../../components/CustomInput";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/CustomButton";
import PersonalInfoEdit from "./PersonalInfoEdit"; // Import the component for editing personal information
import { personalcard, userSquare } from "../../utils/Images";
import { useSelector } from "react-redux";
import { useLanguage } from "../../../LanguageContext";


const PersonalInfo: React.FC = () => {
  const { width } = useWindowDimensions();
  const { t, isArabic } = useLanguage();
  const userData = useSelector((state: any) => state.user.userData);

  const [editMode, setEditMode] = useState<"personal" | null>(null);

  const handleEditPersonalInfo = () => {
    setEditMode("personal");
  };


  return (
    <View style={styles.container}>
      {editMode === "personal" ? (

        <PersonalInfoEdit />
      ) : (
        <>
          <View style={styles.containerText}>
            <Text style={[styles.text, globalStyle.AbelFont]}>
              {t('personalInfo')}
            </Text>
            <Text
              style={[
                styles.text,
                globalStyle.AbelFont,
                { color: colors.gray, lineHeight: 30, fontSize: 15 },
              ]}
            >
              {t('desc')}

            </Text>
          </View>



          <CustomInput
            value={userData?.username ? userData?.username : isArabic ? "اسم الراكب" : " Rider's Name"}
            editable
            ContainerInputStyle={[styles.InputStyle]}
            style={[globalStyle.AbelFont, { width: "95%" }]}
            textAlign={isArabic ? "right" : "left"}
            IconsService={userSquare} >

          </CustomInput>

          <CustomInput
            value={userData?.nationalID ? userData?.nationalID : isArabic ? "رقم الهوية" : "ID Number"}
            editable
            ContainerInputStyle={[styles.InputStyle]}
            style={[globalStyle.AbelFont, { width: "95%" }]}
            textAlign={isArabic ? "right" : "left"}
            IconsService={personalcard}
          >

          </CustomInput>
          <CustomButton
            onPress={handleEditPersonalInfo}
            style={[
              globalStyle.buttonStyle,
              styles.btn,
              {
                width: width * 0.8,
                backgroundColor: colors.mainColor,
              },
            ]}
            buttonText={t('EditYourPersonalInfo')}
            textStyle={[
              styles.NavigationBtnText,
              globalStyle.AbelFont,
              { color: colors.white },
            ]}
          />

        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerText: {
    // flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 25,
  },
  InputStyle: {
    marginTop: 20,
    overflow: "hidden",
    minHeight: 50,
    backgroundColor: colors.whiteLight,
  },
  IconStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  conatinerAddnationalId: {
    height: 150,
    backgroundColor: colors.btnBack,
    shadowColor: colors.white,
    elevation: 4,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    marginRight: 1.7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.containerImage,
    marginBottom: 20,
  },
  NationalIDImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  decContainerImage: {
    color: colors.mainColor,
    fontSize: 14,
    marginTop: 10,
  },
  btnSure: {
    marginVertical: 20,
    borderRadius: 78,
  },
  NavigationBtnText: {
    fontSize: 14,
  },
  btn: { marginVertical: 30 },

});

export default PersonalInfo;
