import React, { useState, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  I18nManager
} from "react-native";
import AppBar from "../../components/AppBar";
import ContainerAddImage from "../../components/ContainerAddImage";
import ContainerAddNationalId from "../../components/ContainerAddNationalId";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { openImagePicker } from "../../components/ImagePicker";
import { globalStyle } from "../../utils/GlobalStyle";
import { Image } from "expo-image";
import {
  Frame,
  addNewCar,
  calendar,
  cardTick,
  mouseSquare,
} from "../../utils/Images";
import { colors } from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import CarInfoEdit from './CarInfoEdit';
import useApi from "../../Api/useApi";
const isRTL = i18n.language === "ar";
const CarInfo = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const userData = useSelector((state: any) => state.user.userData);
  const [imageForm, setimageForm] = useState<string | null | any>(userData?.formImage);
  const [imageNewCar, setimageNewCar] = useState<string | null | any>(null);
  const [allImageNewCar, setallImageNewCar] = useState<string | null | any>(userData?.car?.images || []);



  
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing) {
    return <CarInfoEdit />;
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyle.Container}
      >
 <View style={styles.containerText}>
    <Text style={[styles.text, globalStyle.AbelFont]}>
    {t('VehicleInfo')}

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

        <ScrollView
          horizontal
          contentContainerStyle={[
            styles.containerAllImage,
            { width: allImageNewCar?.length == 0 ? width : "auto" },
          ]}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          decelerationRate={"fast"}
          disableIntervalMomentum
        >
          <ContainerAddImage
            // handleOpenImagePicker={()}
            image={imageNewCar}
            Icon={addNewCar}
            TextDecContainerImage={t('addPhoto')}
          />

          {allImageNewCar?.map((item: any, index: string) => {
            return (
              <Pressable
                // onPress={() => deletCarImage(index)}
                style={styles.containerAddImageCar}
              >
                <Image source={{ uri: item }} style={styles.AllImageCarStyle} />
                
              </Pressable>
            );
          })}
        </ScrollView>

        <CustomInput
          placeholder={t('TypeOfcar')}
          value={userData?.car?.carType}
           editable


          ContainerInputStyle={[styles.InputStyle]}
          style={[globalStyle.AbelFont, { width: "95%" }]}
          textAlign={isRTL ? "right" : "left"}
          IconsService={mouseSquare}>

        </CustomInput>

        <CustomInput
          placeholder={t('CarModel')}
          value={userData?.car?.model}
          editable
          ContainerInputStyle={[styles.InputStyle]}
          style={[globalStyle.AbelFont, { width: "95%" }]}
          textAlign={isRTL ? "right" : "left"}
          IconsService={calendar}
        >
        
        </CustomInput>

        <CustomInput
          placeholder={t('NumOfseats')}
          editable
            value={userData?.car?.seats}
          //   onChangeText={() =>  }
          keyboardType="decimal-pad"
          ContainerInputStyle={[styles.InputStyle]}
          style={[globalStyle.AbelFont, { width: "95%" }]}
          textAlign={isRTL ? "right" : "left"}
          IconsService={Frame}

        >
         
         
        </CustomInput>

        <CustomInput
          placeholder={t('NumofPlate')}
          editable
         value={userData?.car?.plateNumber || ""}
          ContainerInputStyle={[styles.InputStyle]}
          style={[globalStyle.AbelFont, { width: "95%" }]}
            textAlign={isRTL ? "right" : "left"}
          IconsService={cardTick}

        >

        </CustomInput>

        <View style={[styles.conatinerAddnationalId, { width: width * 0.9 }]}>
            <Image
              source={imageForm}
              contentFit="cover"
              style={styles.NationalIDImage}
            />
          </View>


          <CustomButton
        onPress={() => {
          setIsEditing(true); 
        }}
        style={[
          globalStyle.buttonStyle,
          styles.btn,
          {
            width: width * 0.8,
            backgroundColor: colors.mainColor,
          },
        ]}
        buttonText={t('Modify')}
        textStyle={[globalStyle.textButton, { color: colors.white }]}
      />
      </ScrollView>
    </>
  );
};

export default CarInfo;

const styles = StyleSheet.create({
  textPersonal: {
    color: colors.black,
    fontSize: 22,
    marginTop: 37,
    alignSelf: "flex-end",
  },
  detailsTextPersonal: {
    color: colors.graytext,
    fontSize: 14,
    marginTop: 7,
    alignSelf: "flex-end",
  },

  containerAllImage: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor:"#0f0",
  },
  InputStyle: {
    marginTop: 20,
    overflow: "hidden",
    // backgroundColor:"#0f0",
   
  },
  btn: { marginVertical: 30 },
  IconStyle: {
    justifyContent: "center",
    alignItems: "center",
   marginHorizontal:5

  },
  decText: {
    color: colors.grayBtn,
    fontSize: 14,
    marginRight: 10,
  },

  containerAddImageCar: {
    backgroundColor: colors.containerImage,
    width: 155,
    height: 133.5,
    borderRadius: 16.5,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginHorizontal: 10,
    
  },
  btnDeletImage: {
    width: "100%",
    // height: 40,
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    opacity: 0.9,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  decContainerImage: {
    color: colors.delet,
    fontSize: 14,
    marginTop: 10,
  },
  AllImageCarStyle: {
    width: "100%",
    height: "100%",
    // contentFit: "cover",
  },
  containerText: {
    flex: 1,
    padding: 20,
  },text: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 25,
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
    flexDirection: isRTL ? "row-reverse" : "row",
  },
  NationalIDImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
});
