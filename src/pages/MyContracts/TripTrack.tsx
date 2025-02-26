import React from 'react';
import { View, Text, Platform, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../../utils/colors';
import { animle, closecircle, disable, eye, locationSmallIcon, music, numofridersIcon, smoke, tableHome, tickcircle, whiteMony } from '../../utils/Images';
import { globalStyle } from '../../utils/GlobalStyle';
const { width, height } = Dimensions.get('window');

const TripTrack = ({ myContractDetails, t, isArabic }: any) => {

  return (
    <>
      <Text style={[globalStyle.AbelFont]}>
        {t('TripTrack')}
      </Text>
      <View style={{
        marginBottom: 10
      }}>
        <View style={[styles.LineTimeContainer, { flexDirection: isArabic ? 'row-reverse' : 'row' }]}>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: isArabic ? "row-reverse" : "row" }}>
              <View style={styles.SecondView}>
                <Image source={locationSmallIcon} contentFit='contain' style={styles.lineTimeIcon} />
                <View style={styles.lineDott}></View>
                <View style={styles.endCircle}></View>
                <Image source={tableHome} contentFit='contain' style={styles.lineTimeIcon} />
              </View>
              <View style={styles.PlaceNameBox}>
                <View style={[styles.smallPalceNameBox, { flexDirection: isArabic ? "row-reverse" : "row" }]}>
                  <View style={{ width: '85%' }}>
                    <Text style={[globalStyle.AbelFont, styles.placeNameText, { textAlign: isArabic ? 'right' : 'left' }]} numberOfLines={2}>{myContractDetails?.pickUp?.name}</Text>
                  </View>
                </View>
                <View style={[styles.smallPalceNameBox, { flexDirection: isArabic ? "row-reverse" : "row", alignItems: 'flex-end' }]}>
                  <View style={{ width: '85%', justifyContent: 'flex-end' }}>
                    <Text style={[globalStyle.AbelFont, styles.placeNameText, { textAlign: isArabic ? 'right' : 'left' }]} numberOfLines={2}>{myContractDetails?.dropOff?.name}</Text>

                  </View>

                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

    </>
  );
};
const styles = StyleSheet.create({

  LineTimeContainer: {

    marginVertical: 10,
  },
  timeLineText: {
    fontSize: 14,
    color: colors.grayBtn,
    marginRight: 5,
  },
  lineTimeIcon: {
    width: 15,
    height: 15,
  },
  endCircle: {
    position: 'absolute',
    top: '65%',
    width: 10,
    height: 10,
    borderWidth: 1.3,
    borderColor: colors.mainColor,
    borderRadius: 5,
    transform: [{ translateY: -5 }],
  },
  placeNameText: {
    fontSize: 15,
    color: colors.black,
  },
  ViewSmallLine: {
    padding: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },

  SecondView: {
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  lineDott: {
    height: 30,
    backgroundColor: colors.mainColor,
    borderWidth: 0.9,
    borderStyle: 'dashed',
    borderColor: colors.mainColor,
    borderRadius: 0.5,
    marginBottom: Platform.OS === 'ios' ? 24 : 12
  },
  PlaceNameBox:
  {

    justifyContent: 'space-between',
    marginHorizontal: 10,
    // height: 40,

  },
  smallPalceNameBox: {
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:"#f0f",
  },
  moneytext: {
    fontSize: 12,
    fontWeight: '600',
  },
  MoneyIcon: {
    width: 15,
    height: 15,

  },
  eyeIcon: {
    width: 20,
    height: 20,

  },
  seetext: {
    fontSize: 16,
    color: colors.white
  },
  buttonText: {
    fontSize: 14,
    color: colors.mainColor
  },
  seeView:
  {

    backgroundColor: colors.mainColor,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default TripTrack;
