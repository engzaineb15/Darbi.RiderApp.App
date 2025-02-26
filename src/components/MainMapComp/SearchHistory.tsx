import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { View, TextInput, Pressable,  StyleSheet ,Text, Modal, TouchableOpacity, Platform, ScrollView} from 'react-native';
import { Image } from 'expo-image';
import * as Location from "expo-location";
import { useLanguage } from "../../../LanguageContext";
import { canclegray, filter, Search,filterIIcon, locloc } from '../../utils/Images';
import { colors } from '../../utils/colors';
import { Border } from '../../../GlobalStyles';
import { globalStyle } from '../../utils/GlobalStyle';
import useApi from '../../Api/useApi';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import PlaceList from './PlaceList';
import { useGoogleAutocomplete } from '@appandflow/react-native-google-autocomplete'


const API_KEY = 'AIzaSyBs12CcUeEsZBVT2SI_nofD0473-PrKPho'

const SearchHistory = ({ setsearchPlaceName, mapRegion, setOpenSearchModal,setLatitude,setLongitude,setUserLocation,setMapRegion,reverseGeocodeLocation, mapRef }:any) => {
  const { t, isArabic } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [SearchHistoryArr, setSearchHistoryArr] = useState<any>([]);
  const { post ,get} = useApi();
  const { locationResults, setTerm, clearSearch, searchDetails, term } =
  useGoogleAutocomplete(API_KEY, {
    language: isArabic ? 'ar' : 'en',
    debounce: 300,
    radius: '2000'
    //queryTypes: 'address'
  });
  
  const PostSearch = async (q?: string) => {
    const postData = {
      searchDetails: q      
    };
     console.log(postData)
    try {
      const response = await post('search/history', postData);
       
        // console.log(response.data);
        

    } catch (error) {
      console.error('Error posting advertisement:', error);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const location = await Location.geocodeAsync(query);
      if (location && location.length > 0) {
        mapRef.current?.animateToRegion(
          {
              latitude: location[0]?.latitude,
              longitude: location[0]?.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.009,
          },
          1200
      )
        setsearchPlaceName(query)
        PostSearch(query)
        setOpenSearchModal(false)

      }
    } catch (error) {
      console.error("Error fetching location: ", error);
    }
  };

  useEffect(() => {
   

    const getSearchHistory = async () => {
      // setloading(true);
      try {
        const response = await get(`search/history`);
        
        setSearchHistoryArr(response?.data || []);
        // console.log("SearchHistoryArr:", SearchHistoryArr); 
        // console.log("Response message:", response?.data); 

        // setloading(false);
      } catch (err) {
        // setError(err);
        // setloading(false);
       console.log("Error", "Failed to fetch Search History.");
      }
    };

    getSearchHistory();
    // console.log("jobPosts", jobPosts);
  }, []);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false); 
  const ref = useRef();

const onPressAutoCompelete = async (data: any, details: any) => {
  const selectedLocation = {
      latitude: details?.geometry?.location?.lat,
      longitude: details?.geometry?.location?.lng,
      placeName: data.description,
  };
  console.warn(data)
  console.warn(details)

  try {
      // تحريك الخريطة إلى الموقع المختار
      mapRef.current?.animateToRegion(
          {
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.009,
          },
          1200
      );

      setsearchPlaceName(selectedLocation.placeName);
      const postData = {
          searchDetails: selectedLocation.placeName,
      };
      await post('search/history', postData);

      setOpenSearchModal(false);
  } catch (error) {
      console.error("Error processing location: ", error);
  }
}

  const onPressSearchItem = async(location?: any, name?: string)=>{
      if(location){
        setsearchPlaceName(name);
        const postData = {
            searchDetails: name,
        };
        await post('search/history', postData);
        mapRef.current?.animateToRegion(
          {
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.002,
              longitudeDelta: 0.009,
          },
          1200
        );
        setOpenSearchModal(false);
      }else{
        handleSearch(term)
      }

  }



  return (
    <>

  <View style={styles.basicContainer}>

    <View style={[styles.header]}>

      <View style={{
        // backgroundColor: "#0f0d",
        alignItems:isArabic  ? 'flex-end' : 'flex-start',
       
      }}>
          <View style={{
            flexDirection: isArabic  ? 'row-reverse' : 'row',
            // backgroundColor:"#0ff",
          }}>

            <TouchableOpacity
              onPress={() => 
               {setOpenSearchModal(false)}
              }
              style={{
                  // backgroundColor:"#0ff",
                flexDirection: isArabic  ? 'row-reverse' : 'row',
                alignItems: 'center',
                // justifyContent: 'center'
              }}
            >

              <Image source={canclegray} contentFit="cover" style={{
                 width: 20,
                  height: 20,
                   marginLeft: isArabic  ? 5 : 0, 
                  marginRight: isArabic  ? 0 : 5
                   }} />

              <Text style={[styles.lastMessage, globalStyle.AbelFont, { 
                fontSize: 17, color: colors.grayText,
             

               }]}>{t('Close')}</Text>
            </TouchableOpacity>
          </View>

          
          <View style={{
            flexDirection: isArabic  ? 'row-reverse' : 'row',
            // backgroundColor:"#0f0",
            alignItems: 'center',
            // justifyContent: "space-between",
            marginTop: 10
          }} >
            <Text style={[styles.pageName,globalStyle.AbelFont]}>
              {t('search')}
            </Text>
          </View> 

   </View>

            <View style={[styles.searchView,{
  
         flexDirection:isArabic? 'row-reverse' :'row',
        //  backgroundColor:"#0f0",
        alignItems:'center',
        justifyContent:"space-between",
        marginTop: 10
        }]}>


    

<View 
  style={{ 
    ...styles.searchBox, 
    flexDirection: isArabic ? 'row' : 'row-reverse', 
    borderColor: isFocused ? colors.mainColor : "rgba(238, 238, 238, 1)",
    alignItems: 'center',
    padding: 8
 
  }}
>
  {term && (
<TouchableOpacity
              onPress={() => 
               {setTerm("")}
              }
              style={{
                width: 24,
                height: 24,
                borderRadius:12,
                alignSelf:'center',
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
)}
      <TextInput
          value={term}
          onChangeText={setTerm}
          style={{flex: 1,}}
          onSubmitEditing={()=>term.trim().length > 0 && handleSearch(term)}
          placeholder={t('search')}
          onFocus={handleFocus}
          onBlur={handleBlur}
      />
       <View
        style={{
            marginHorizontal: 10,
            alignSelf: 'center',
        }}
    >
        <Image
            source={Search}
            style={{
                width: 20,
                height: 20,
            }}
            contentFit="contain"
        />
    </View>

      </View>
    
      {/* <Pressable onPress={() => {}}>
    
<View style={[styles.searchShadowBox,{ zIndex: 1 }]}>
            <Image
              style={styles.iconLayout}
              contentFit="contain"
              source={filter}
            />
          </View>
          </Pressable> */}
          </View>

            {/*  */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              maxWidth: 300, 
              justifyContent: 'center', 
              paddingHorizontal: 10, 
              alignItems: isArabic ? 'flex-end' : 'flex-start',
              }}> 
            {locationResults.map((el, i) => (
                  <TouchableOpacity
                    key={String(i)}
                    style={{marginBottom: 6, flexDirection: 'row'}}
                    onPress={async () => {
                      const details = await searchDetails(el.place_id);
                      onPressSearchItem(details.geometry.location, el.description)
                    }}
                  >
                      <View 
                        style={{
                          width:30,
                          height:30,
                          borderRadius:5,
                          backgroundColor:colors.reyfg,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 8,
                          marginLeft: 8
                        }}
                      >

                        <Image source={locloc} contentFit="cover" style={{
                          width: 20,
                          height: 20,
                        
                        }} />
                    </View>

                    <Text style={{fontStyle: 'italic'}}>{el.structured_formatting.main_text} - {el.structured_formatting.secondary_text}</Text>
                  </TouchableOpacity>
                ))}
            </View>

            <View style={{
            flexDirection: isArabic  ? 'row-reverse' : 'row',
            // backgroundColor:"#0f0",
            alignItems: 'center',
            justifyContent: "space-between",
            marginTop: 10
          }} >
            <Text style={[globalStyle.AbelFont,{ fontSize: 17, color: colors.grray,}]}>
              {t('lastSearch')}
            </Text>
          </View> 
       
          {SearchHistoryArr.map((item, index) => (
  <Pressable 
  // onPress={() => {
  //   setSearchQuery(item?.searchDetails)
  //   setsearchPlaceName(item?.searchDetails)
  // }
  onPress={()=> {
    handleSearch(item?.searchDetails)
    setOpenSearchModal(false)
  }}
  key={item._id}
  style={{
    // backgroundColor:"#f0f",
    flexDirection: isArabic  ? 'row-reverse' : 'row',
    alignItems: 'center',
    // justifyContent: "space-between",
   
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor:"#ccc",
    // padding:10
    paddingVertical:15
  
  }}
  >
   
    <View 
    style={{
      width:30,
      height:30,
      borderRadius:5,
      backgroundColor:colors.reyfg,
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >

<Image source={locloc} contentFit="cover" style={{
                 width: 20,
                  height: 20,
                  
                   }} />
              </View>


        <View
        style={{
          marginHorizontal:7
        }}
        >
              <Text style={[styles.lastMessage,globalStyle.AbelFont,{ fontSize: 17, color: colors.black }]}>
              {item?.searchDetails}
            </Text>
            </View>

  </Pressable>

      ))}
      </ScrollView>
            </View>


</>


  );
};

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    
  },
    header: {
    paddingTop: Platform.OS === 'ios' ? 80 : 40,

    // paddingBottom: 10,
    // backgroundColor:"#0ff"

  },
    pageName: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.black,
    
  },
    searchView: { 
        padding:5,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",

      },
      searchBox: {
        backgroundColor: colors.white,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  shadowOpacity: 0.32,
  shadowRadius: 5.46,
  borderRadius: 15,
      
      },
    
      searchInput: {
        flex: 1,
        // color: colors.mainColor,
        // paddingLeft: 10,
        // paddingVertical:4
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
       
      },
      iconLayout: {
        width: 80,
        height: 80,
        
      },
  lastMessage: {
    fontSize: 16,
    color: colors.textcolor,
    // lineHeight: 30,
    // marginLeft: 10
  },
 
});

export default SearchHistory;
