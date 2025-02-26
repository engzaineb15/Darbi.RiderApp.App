import React from 'react';
import { View,Image, Text, TouchableOpacity ,StyleSheet, Platform, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, filter, X } from '../../utils/Images';
import { colors } from '../../utils/colors';
import { globalStyle } from '../../utils/GlobalStyle';
import { useLanguage } from '../../../LanguageContext';
import AppBar from '../../components/AppBar';

const HeaderContractDetails = ({  }: { }) => {

  const navigation = useNavigation();
  const {t, isArabic} = useLanguage();

  return (
   
    <>

<View
        style={[
          styles.container,
          {
            flexDirection: isArabic ? "row-reverse" : "row",
            // justifyContent:isArabic ? "flex-start" : "flex-end",
            marginTop: Platform.OS === "ios" ? 50 : 40,
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
          <Text style={[styles.bagsName, globalStyle.AbelFont,]}>
            {t('Contract_details')}
          </Text>
        </View>

        <View
        style={{
          width:30,
          height:30,
          // backgroundColor:"#0f0"
        }}
        ></View>
       
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal:15
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
    borderWidth: 0.5,
   
  },
  bagsName: {
    marginHorizontal: 10,
    fontSize: 22,
  
  }
  });
export default HeaderContractDetails;


