import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { colors } from "../../utils/colors";
import { globalStyle } from "../../utils/GlobalStyle";
import { arrowDown } from "../../utils/Images";
import { useLanguage } from "../../../LanguageContext";
import { useSelector } from 'react-redux';

interface ListCarCompProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  setSelectedItem: (item: string) => void;
}

const ListCarComp: React.FC<ListCarCompProps> = ({
  isOpen,
  onClose,
  items,
  setSelectedItem,
}) => {
  const { t, isArabic } = useLanguage();
  const [selectedItemState, setSelectedItemState] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectItem = (item: string) => {
    setSelectedItemState(item);
    setSelectedItem(item);
    onClose();
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        nestedScrollEnabled={true}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.listItem, {
              flexDirection: isArabic ? 'row-reverse' : 'row',
              backgroundColor: selectedItemState === item ? colors.mainColor : 'transparent',
            }]}
            onPress={() => handleSelectItem(item)}
          >
            <Text style={styles.listItemText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    zIndex: 5,
  },
  dropdownButton: {
    borderRadius: 30,
    // justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.lightgreengreen,
    justifyContent: "center",
    // marginTop: 20,
  },
  dropdownButtonText: {
    ...globalStyle.AbelFont,
    color: colors.mainColor,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    tintColor: colors.mainColor,
  },
  dropdownList: {
    marginTop: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    // borderColor: colors.mainColor,
    // borderWidth: 1,
    maxHeight: 200,
  },

  searchInputContainer: {
    alignItems: 'center',
    
    paddingHorizontal: 10,
    height: 40,
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    ...globalStyle.AbelFont,
    fontSize: 16,
    color: colors.black,
  },
  searchInputIcon: {
    width: 20,
    height: 20,
    // marginRight: 10,
  },
  listItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listItemHover: {
    backgroundColor: colors.lightgreengreen,
  },
  listItemText: {
    ...globalStyle.AbelFont,
    color: colors.black,
  },
  checkmark: {
    color: colors.mainColor,
  },

  selectedPlace: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  selectedPlaceText: {
    ...globalStyle.AbelFont,
    color: colors.mainColor,
  },
  separator: {
    color: colors.mainColor,
    marginHorizontal: 5,
  },
  changeButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
  },
  changeButtonText: {
    ...globalStyle.AbelFont,
    color: colors.white,
  },
  textPlace: {
    color: colors.graytext,
    fontSize: 15,
    // marginLeft:5
  },
  labelContainer: {
    marginRight: 10,
    marginBottom: 5,
  },
  styleOfPointText: {
    width:'100%',
    padding:5,
    marginTop:10,
    justifyContent:'space-between',
    alignItems:'center',
    // backgroundColor:"#f00"
  },
  styleOfBox: {
    flex: 1,
    backgroundColor: colors.lightgreengreen,
    // width:'80%',
    alignItems:'center',
    borderRadius:10,
   justifyContent:'space-between',
   paddingHorizontal:10,
   paddingVertical:5,
  },
  selectedPlacesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  pressableChange: {
    paddingHorizontal:5,
    borderRadius:7,
    backgroundColor:colors.mainColor
   
  },
  pressableChangeText: {
    padding:8,
    fontSize:12,
    color:colors.white
 
  },

});

export default ListCarComp;

