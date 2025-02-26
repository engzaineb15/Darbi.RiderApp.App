import React, { useState,useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Modalize from '../Modalize';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import CustomDropDownList from '../CustomDropDownList';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal';
import { Image } from 'expo-image';
import moment from 'moment';

import { useLanguage } from '../../../LanguageContext';
import { colors } from '../../utils/colors';
import { globalStyle } from '../../utils/GlobalStyle';
import { driverIcon, personalcard, mouseSquare } from '../../utils/Images';
import utils from '../../utils';
import useApi from '../../Api/useApi';
import { useNavigation } from '@react-navigation/native';

const {height, width } = Dimensions.get('window');

interface PersonalInfoModalProps {
  visible: boolean;
  addModal: boolean;
  setVisible: (visible: boolean) => void;
  setaddModal:(addModal: boolean) => void;
}

const FomChatModal: React.FC<PersonalInfoModalProps> = ({setaddModal, addModal,visible, setVisible,contractId }) => {
  const { t, isArabic } = useLanguage();
  const { put } = useApi();
  const [fullName, setFullName] = useState('');
  const [IDNum, setIDNum] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [loadingModal, setloadingModal] = useState(false);
  const { navigate } = useNavigation()
  
  useEffect(() => {
    console.log(contractId);
  }, []);
  const handleSubmit = async () => {
    
    setloadingModal(true)
 
     const dataToSend = 
       {
         "username": fullName,
         "gender": selectedTrip,
         "birthDate": date,
         "nationality": country,
         "nationalID": IDNum
       }
     
     console.log("Data to send:", JSON.stringify(dataToSend));
   
     try {
       const response = await put("rider", JSON.stringify(dataToSend));
       if (response.status === 200) {
         console.log("PUT request successful Form:", response.data);
         utils.toastAlert('success', response.data.message || "Failed to submit data. Please try again.");
         
    setloadingModal(false)

    navigate('ContartDetails',{contractId})
         
       } else {
         // console.error("PUT request failed:", response.data);
         utils.toastAlert('error', "Failed to update driver data. Please try again.");
       }
     } catch (error : any) {
       if (error.response) {
         // console.error("Failed to submit data:", error.response.data);
         utils.toastAlert('error', error.response.data.message || "Failed to submit data. Please try again.");
         setloadingModal(false)
 
         // Alert.alert("Error", "Failed to update driver data. Please try again.");
       } else {
         console.error("Failed to submit data:", error);
         // Alert.alert("Error", "Failed to update driver data. Please try again.");
         utils.toastAlert('error',error.response.data.message || "Failed to submit data. Please try again.");
         setloadingModal(false)
 
       }
     }
   };


   
 
  const onChange = (event: any, selectedDate: string) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const onSelect = (country: { name: React.SetStateAction<null>; }) => {
    setCountry(country.name);
    setVisible(false);
  };



  return (
    <>
   
    
        <Pressable
          onPress={() => setaddModal(false)}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            height:height * 1,

          }}>

          <StatusBar backgroundColor={"transparent"} translucent={true} />
          <Modalize>
            <Pressable onPress={() => { }}>
              {
                <View style={styles.modalContainer}>
                  <Text style={[styles.titleTextModal, globalStyle.AbelFont, {  }]}>
                    {t('Your_personal_info')} 
                  </Text>
                  <Text style={[styles.titleTextModal, globalStyle.AbelFont, {color:colors.grayBtn}]}>
                    {t('Descript')}
                  </Text>
                 <View
                 style={{
                  // backgroundColor:"#f0f",
                  //  marginBottom:15

                 }}
                 >
                  <View
                  style={{
                    // backgroundColor:"#00f",
                    marginTop:20
                  }}
                  >
                    <Text style={[{color:colors.grayBtn}, globalStyle.AbelFont]}>
                    {t('Gender')}
                    <Text style={[{color:colors.redd}, globalStyle.AbelFont]}>
                    {' *'}
                  </Text>
                  </Text>
                  </View>

                  <View style={[styles.containerNavigation,{ flexDirection: isArabic?"row-reverse":"row",
                  }]}>
          <CustomButton
            onPress={() => setSelectedTrip("Male")}
            style={[
              globalStyle.buttonBorderStyle,
              {
                width: width * 0.43,
                backgroundColor: selectedTrip === "Male" ? colors.colorLightcyan : colors.whiteLight,
              },
            ]}
            buttonText={t('Man')}
            textStyle={[
              styles.NavigationBtnText,
              globalStyle.AbelFont,
              { color: selectedTrip === "Male" ? colors.mainColor : colors.grayBtn },
            ]}
          />
          <CustomButton
            onPress={() => setSelectedTrip("Female")}
            style={[
              globalStyle.buttonBorderStyle,
              {
                width: width * 0.43,
                backgroundColor: selectedTrip === "Female" ? colors.colorLightcyan : colors.whiteLight,
              },
            ]}
            buttonText={t('Woman')}
            textStyle={[
              styles.NavigationBtnText,
              globalStyle.AbelFont,
              { color: selectedTrip === "Female" ? colors.mainColor : colors.grayBtn },
            ]}
          />
        </View>

                   
        <CustomInput
          placeholder={t('Full_name')}
          showStar={true}
          value={fullName}
          onChangeText={(text) => setFullName(text)}  
          ContainerInputStyle={[styles.InputStyleModal]}
          style={[globalStyle.AbelFont,
             { width: "95%" }]}
          textAlign={isArabic?"right":"left"}
        >
       
          <View style={[styles.IconStyle,{}]}>
            <Image source={driverIcon} contentFit="contain"  style={{width: 20, height: 20, marginLeft: isArabic ? 5 : 0, marginRight: isArabic ? 0 : 5 }} />
          </View>
        </CustomInput>

     
        <CustomDropDownList
          onPress={() => setShow(true) }
          textService={ date ? moment(date).format('YYYY-MM-DD') : t('Date_of_brith')}
          IconsService={mouseSquare}
        />

<CustomDropDownList
          onPress={() => setVisible(true) }
          textService={country ? country : t('Nationality')}
          IconsService={mouseSquare}
        />


<CustomInput
          placeholder={t('ID_number')}
          showStar={true}
            value={IDNum}
            onChangeText={(text) => setIDNum(text)}  
          ContainerInputStyle={[styles.InputStyleModal,{
            // marginTop:20
          }]}
          style={[globalStyle.AbelFont,
             { width: "95%" }]}
          textAlign={isArabic?"right":"left"}
        >
       
          <View style={[styles.IconStyle,{  }]}>
            <Image source={personalcard} contentFit="contain"  style={{width: 20, height: 20, marginLeft: isArabic ? 5 : 0, marginRight: isArabic ? 0 : 5}} />
          </View>
        </CustomInput>


<CustomButton
              onPress={handleSubmit}
              style={[
                globalStyle.buttonStyle,
                styles.btn,
                { width: width * 0.8,
                   backgroundColor: fullName.length === 0 || IDNum.length === 0 ? colors.graybtn : colors.colorDarkcyan 
                  // backgroundColor: colors.graybtn 
                  
                  },
              ]}
              buttonText={t('Continue')}
              textStyle={[styles.textButton, globalStyle.AbelFont, { color: colors.white }]}
              disabled={loadingModal}
              loading={loadingModal}
            />
                 </View>

                </View>
              }
            </Pressable>
          </Modalize>
        </Pressable>
     

     
{show ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={'date'}
                  // minimumDate={new Date()}
                  is24Hour={false}
                  display="spinner"
                  // style={{backgroundColor: Colors.LightPink}}
                  onChange={onChange}
                />
              ) : null} 

 {visible && (
 
 <CountryPicker
        withFilter
        withAlphaFilter
        withCallingCode={false} // This hides the calling codes
        withFlag
        visible={visible}
        onClose={() => setVisible(false)}
        onSelect={onSelect}
      /> 
      
      
     )} 
     
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
   paddingHorizontal:10
  },
  titleTextModal: {
    fontSize: 18,
    marginBottom: 10,
  },
  containerNavigation: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  NavigationBtnText: {
    fontSize: 14,
  },
  IconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputStyleModal: {
    paddingHorizontal: 15,
    borderColor: 'rgba(238, 238, 238, 1)',
    borderWidth: 1,
    marginTop:20
  },
  btn: {
    marginTop: 20,
  },
  textButton: {
    color: colors.mainColor,
    fontSize: 16,
  },
});

export default FomChatModal;
