import * as React from "react";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View,Dimensions, useWindowDimensions,I18nManager } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../../../GlobalStyles";
import CustomButton from "../../components/CustomButton";
import { globalStyle } from "../../utils/GlobalStyle";
import { colors } from "../../utils/colors";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { confirm } from "../../utils/Images";
const isRTL = i18n.language === "ar";
const ConfirmedAdv = ({ navigation, route }: any) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const adInfo = "Done";

  return (
    <View style={styles.view}>
     
      <View style={styles.frameParent}>
        <View style={styles.illustrationParent}>
          <Image
            style={styles.illustrationIcon}
            contentFit="cover"
            source={confirm}
          />
          <View style={styles.parent}>
            <Text style={[styles.text, styles.textTypo,globalStyle.AbelFont]}>
             {t('AdvDone')}
            </Text>
            <Text style={[styles.text1, styles.textTypo,globalStyle.AbelFont]}>
             {t('DoneDesc')}
            </Text>
          </View>
        </View>

        <Pressable  
          onPress={() => {
            navigation.navigate("NavigationBottomBarStack", { 
              screen: "الرئيسية", 
              params: { adInfo },
              
            });
          }}
        >  
 
  
        <View style={[styles.button, styles.buttonFlexBox]}>
          <Text style={[styles.label, styles.textTypo,globalStyle.AbelFont,{ fontSize:17}]}>{t("GotoHome")}</Text>
        </View>
   </Pressable>
      </View>
      
    
    </View>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },NavigationBtnText: {
    fontSize: 14,
  },
  textTypo: {
    textAlign: "center",
   
  },
  btnSure: {
    marginVertical: 20,
    borderRadius: 78,
  },
  borderPosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  timePosition: {
    top: "50%",
    position: "absolute",
  },
  money2Icon: {
    top: 263,
    left: 203,
    width: 24,
    height: 24,
    position: "absolute",
  },
  time: {
    marginTop: -10.5,
    fontSize: FontSize.size_mid,
    lineHeight: 22,
    color: Color.colorGray_200,
    letterSpacing: 0,
    textAlign: "center",
    top: "50%",
    position: "absolute",
    width: 54,
    left: 0,
  },
  timeIphone: {
    height: 21,
    zIndex: 0,
    width: 54,
  },
  border: {
    width: "91.58%",
    right: "8.42%",
    left: "0%",
    borderRadius: Border.br_9xs_5,
    borderStyle: "solid",
    borderColor: Color.colorGray_200,
    borderWidth: 1,
    opacity: 0.35,
  },
  capIcon: {
    height: "30.77%",
    width: "4.76%",
    top: "36.15%",
    right: "0%",
    bottom: "33.08%",
    left: "95.24%",
    maxWidth: "100%",
    maxHeight: "100%",
    opacity: 0.4,
    position: "absolute",
    overflow: "hidden",
  },
  capacity: {
    height: "69.23%",
    width: "76.92%",
    top: "15.38%",
    right: "15.75%",
    bottom: "15.38%",
    left: "7.33%",
    borderRadius: 1,
    backgroundColor: Color.colorGray_200,
    position: "absolute",
  },
  battery: {
    width: "34.87%",
    right: "0.13%",
    left: "65.01%",
  },
  wifiIcon: {
    width: 17,
    height: 12,
  },
  cellularConnectionIcon: {
    width: 19,
    height: 12,
  },
  cellularwifibatteryIphone: {
    width: 78,
    height: 13,
    zIndex: 1,
  },
  floatingIsland: {
    marginTop: -15.5,
    marginLeft: -63,
    left: "50%",
    borderRadius: Border.br_lg_5,
    backgroundColor: Color.darkBlackPrimary,
    width: 127,
    height: 37,
    zIndex: 2,
  },
  statusBar: {
    top: 0,
    width: 430,
    justifyContent: "space-between",
    paddingLeft: Padding.p_8xl,
    paddingTop: Padding.p_lg,
    paddingRight: Padding.p_7xl,
    paddingBottom: Padding.p_sm,
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  illustrationIcon: {
    width: 140,
    height: 140,
  },
  text: {
    alignSelf: "stretch",
    fontSize: FontSize.size_xl,
    color: Color.appColorTitles,
  },
  text1: {
    fontSize: FontSize.size_sm,
    color: Color.grey700,
    marginTop: 12,
  },
  parent: {
    width: 343,
    marginTop: 32,
    alignItems: "center",
  },
  illustrationParent: {
    alignItems: "center",
  },
  label: {
    fontSize: FontSize.size_sm_1,
    lineHeight: 17,
    color: Color.baseWhite,
    letterSpacing: 0,
    textAlign: "center",
  },
  button: {
    borderRadius: 78,
    backgroundColor: Color.colorDarkcyan,
    width: 335,
    height: 53,
    justifyContent: "center",
    padding: 9,
    marginTop: 22,
    alignItems: "center",
  },
  frameParent: {
     alignSelf:"center",
     justifyContent:"center",
 
  },
  view: {
    backgroundColor: Color.baseWhite,
    flex: 1,
    width: "100%",
    // height: 932,
    overflow: "hidden",
    alignItems:"center",
    justifyContent:"center",
  },
});

export default ConfirmedAdv;
