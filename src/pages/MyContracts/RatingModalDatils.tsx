import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import { colors } from '../../utils/colors';
import { globalStyle } from '../../utils/GlobalStyle';
import { useLanguage } from '../../../LanguageContext';
import { star } from '../../utils/Images';



const RatingModalDatils = ({ ratingData }:any) => {
    const { t, isArabic } = useLanguage();
  return (
    <>

      <View style={[styles.header]}>
        <Text style={[{ fontSize: 17 }, globalStyle.AbelFont]}>
          {t('RatingModalDatils')}
        </Text>
        </View>

  <View 
  style={{
    flexDirection: isArabic  ? 'row-reverse' : 'row',
    alignItems: 'center',
    
  }}
  >
    <Text style={styles.ratingText}>{t('YourRating')} : {ratingData?.stars} </Text>
    <Image 
                source={star} 
                style={[styles.star, isArabic && styles.ar_margin]} 
            />
    {/* */}

  <Text style={styles.ratingDetails}>{t('YourRating')} : {ratingData?.details}</Text> 
  </View>
    
    </>
  );
};


const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    borderColor: "rgba(238, 238, 238, 1)",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingBottom: 10,
    // paddingHorizontal: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  ratingDetails: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginTop:10
  },
  star: {
    width: 15,
    height: 15,
    marginLeft: 5
},
starView:{
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'absolute',
    // top: 10,
    // right: 10
},
starViewAr:{
//   left: 10,
//   top: 10,
  flexDirection: 'row-reverse',
//   justifyContent: 'flex-end'
},
ar_margin: {
    marginLeft: 0,
    marginRight: 5
  },
});

export default RatingModalDatils;
