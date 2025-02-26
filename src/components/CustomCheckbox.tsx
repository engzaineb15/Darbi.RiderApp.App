import React from 'react';
import { View, Text, Pressable, StyleSheet,I18nManager } from 'react-native';
import { colors } from "../utils/colors";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { globalStyle } from '../utils/GlobalStyle';
const isRTL = i18n.language === "ar";
interface CustomCheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  mainColor: string; 
  greyColor: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, isChecked, onChange, mainColor, greyColor }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.checkboxContainer}>
     <Pressable
        onPress={() => onChange(true)}
        style={[
          styles.checkbox,
          { borderColor: isChecked ? mainColor : greyColor },
        ]}
      >
        <Text style={[styles.label, { color: isChecked ? mainColor : greyColor }]}>{t('notAvailable')}</Text>
      </Pressable>
      <Pressable
        onPress={() => onChange(false)}
        style={[
          styles.checkbox,
          { borderColor: !isChecked ? mainColor : greyColor },
        ]}
      >
        <Text style={[styles.label, { color: !isChecked ? mainColor : greyColor }]}>{t('available')}</Text>
      </Pressable>
      <View
      style={{
        width:'20%',
        // backgroundColor:"#f0f",
        justifyContent:"center",
        alignItems:isRTL?"flex-end":"flex-start"
      }}
      >
      <Text style={[styles.optionLabel,globalStyle.AbelFont]}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    // backgroundColor:"#fd0",
    flexDirection: isRTL ? "row" : "row-reverse",
    alignItems: 'center',
    justifyContent:"space-between",
    marginVertical: 10,
  },
  checkbox: {
    width:'36%',
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    marginRight: 10,
    alignItems:'center'
  },
  label: {
    fontSize: 16,
  },
  checkedLabel: {
    color: colors.mainColor,
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default CustomCheckbox;
