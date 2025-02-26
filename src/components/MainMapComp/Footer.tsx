import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';
import { globalIcon, gpsIcon } from '../../utils/Images';
import { useLanguage } from '../../../LanguageContext';

const Footer = ({ getCurrentLocation }: { getCurrentLocation: () => void }) => (
// const {t, changeLanguage, isArabic } = useLanguage();
    
  <View style={styles.footerView}>
    <View style={{ 
        alignItems: 'flex-end'
         }}>
      <Pressable onPress={() => { /* Handle global icon press */ }}>
        <Image style={styles.icon} contentFit="contain" source={globalIcon} />
      </Pressable>
      <Pressable onPress={getCurrentLocation}>
        <Image style={styles.icon} contentFit="contain" source={gpsIcon} />
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
   footerView: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 7.5 : 15,
    // marginTop: Platform.OS === 'ios' ? 40 : 20,
    // backgroundColor:"#ff9",
    width:"100%",
    // padding:10
   
  },
  icon: { width: 80, height: 80 }
});

export default Footer;
