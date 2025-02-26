import React, { useState } from 'react';
import { View, TextInput, Pressable,  StyleSheet ,Text, Modal, TouchableOpacity, Platform} from 'react-native';
import { Image } from 'expo-image';
import { useLanguage } from "../../../LanguageContext";
import { canclegray, filter, Search, settingFilter } from '../../utils/Images';
import { colors } from '../../utils/colors';
import { Border } from '../../../GlobalStyles';
import { globalStyle, responsiveHeight, responsiveWidth } from '../../utils/GlobalStyle';
import { useNavigation } from "@react-navigation/native";
import SearchHistory from './SearchHistory';
import FilterMainPage from './FilterMainPage';
const SearchBar = ({mapRef,setAllDrivers,setLoading}:any) => {
  const { t, isArabic } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [OpenSearchModal, setOpenSearchModal] = useState(false);
  const [searchPlaceName,setsearchPlaceName]= useState('')
  const [filterModal, setfilterModal] = useState(false);
  
  const navigation = useNavigation<any>();
  

  return (
    <View style={[styles.searchView,{
      top: Platform.OS === 'ios' ?  40 : 30,
      flexDirection:isArabic ? 'row-reverse' :'row',
      justifyContent: 'space-between',
   
   }]}>
        <View  style={[{...styles.searchBox, ...styles.searchShadowBox},{
      flexDirection: isArabic ?'row':'row-reverse',
   

        }]}>

 {searchPlaceName && 
<TouchableOpacity
              onPress={() => 
              {
                setsearchPlaceName('')
              }
              }
              style={{
                width: 24,
                height: 24,
                borderRadius:12,
                alignSelf:isArabic?'flex-start':'flex-end',
                backgroundColor:colors.garyCustom,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal:5
              }}
            >

              <Image source={canclegray} contentFit="cover" style={{
                 width: 13,
                  height: 13,
                   }} />

           
            </TouchableOpacity>
     }
            <Pressable
            onPress={() => 
              // navigation.navigate('SearchHistory')
              setOpenSearchModal(true)
            }
            style={styles.searchInput}
            >  
            {searchPlaceName ? (
             <Text style={[globalStyle.AbelFont,{fontSize:14,color:colors.mainColor,textAlign:isArabic ? 'right':'left'}]} numberOfLines={1}>{searchPlaceName}</Text>

            ) : (
             <Text style={[globalStyle.AbelFont,{fontSize:14,color:colors.grayBtn,textAlign:isArabic ? 'right':'left'}]}>{ t('searchText')}</Text>

            )}


  
            </Pressable>
  
  
          <View
          style={{
            // backgroundColor:"#0f0",
            marginHorizontal:10,
            alignSelf:'center'}}>
                  <Image
                    source={Search}
                    style={{
                      width: 18,
                      height: 18,
                    }}
                    contentFit="contain"
                  />
                  </View>
        </View>
      
        <Pressable onPress={() => 
         setfilterModal(true)
        }>
      
  <View style={[styles.filterIconBox,{
    marginRight:isArabic?10:0,
    marginLeft:isArabic?0:10
  }]}>
              <Image
                style={styles.iconLayout}
                contentFit="contain"
                source={settingFilter}
              />
            </View>
            </Pressable>
 
      <Modal 
  animationType="slide"
  transparent={true}
  visible={OpenSearchModal}
  statusBarTranslucent
  onRequestClose={() => {
    setOpenSearchModal(false);
  }}
>
 
   <SearchHistory mapRef={mapRef} setsearchPlaceName={setsearchPlaceName} setOpenSearchModal={setOpenSearchModal}  />

</Modal>



{filterModal &&
<Modal
        animationType="slide"
        transparent={true}
        visible={filterModal}
        onRequestClose={() => setfilterModal(false)}
      >
        <FilterMainPage setLoading={setLoading} setAllDrivers={setAllDrivers} setfilterModal={setfilterModal} />
      </Modal>
    }
      </View>





  );
};

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
    
    pageName: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.black,
    
  },
    searchView: { 
      position: 'absolute',
      // width: '96%', // Slightly reduced to accommodate the spacing
      padding: 15,
      alignSelf: "center",
      alignItems: "center",
      },
      searchBox: {
        backgroundColor: colors.white,
        width: responsiveWidth(312),
        height:responsiveHeight(50),
        // alignItems:"center",
        padding: 10,
        borderRadius: Border.br_base,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      },
    
      searchInput: {
        flex: 1,
        color: colors.mainColor,
        paddingLeft: 10,
        paddingVertical:4,
        justifyContent: 'center'
        
      },
      map: {
        flex: 1,
      },
      markerContainer: {
        flex:1,
        // backgroundColor:'#0f0',
        alignItems: "center",
        justifyContent: "center",
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "white",
      },  
searchShadowBox: {
  borderRadius: Border.br_base,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
},
      filterIconBox: {
        backgroundColor: colors.white,
        width: responsiveWidth(48),
        height: responsiveHeight(49),
        borderRadius:16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      },
      iconLayout: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
      },
  lastMessage: {
    fontSize: 16,
    color: colors.textcolor,
    lineHeight: 30,
    // marginLeft: 10
  },
 
});

export default SearchBar;
