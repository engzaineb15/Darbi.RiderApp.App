import { Image, Pressable, StyleSheet, TextInput, View } from "react-native"
import { filter, Search } from "../../utils/Images"
import { colors } from "../../utils/colors"
import { useState } from "react"
import { useLanguage } from "../../../LanguageContext"
import { Border } from "../../../GlobalStyles"

const SerachView = ()=>{

    const { isArabic, t } = useLanguage()
    const [searchQuery, setSearchQuery] = useState<string>("");
    const handleSearch = ()=>{}


    return(
        <View style={[styles.searchView,{
            flexDirection:isArabic ? 'row-reverse' :'row',
         }]}>
              <View  style={[{...styles.searchBox, ...styles.searchShadowBox},{
            flexDirection: isArabic ?'row':'row-reverse',
              }]}>
              <TextInput
                    placeholder={t('searchText')}
                    style={styles.searchInput}
                    placeholderTextColor={colors.grayBtn}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)} 
                    onBlur={handleSearch} 
                  />
                <View
                style={{
                  marginHorizontal:10,
                  alignSelf:'center'}}>
                        <Image
                          source={Search}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          resizeMode="contain"
                        />
                        </View>
              </View>
              <Pressable onPress={() => {}}>
                <View style={styles.searchShadowBox}>
                    <Image
                      style={styles.iconLayout}
                      resizeMode="contain"
                      source={filter}
                    />
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    
  searchView: { 
    position: 'absolute',
    width: '96%',
    padding:15,
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center",
  },
  searchBox: {
    backgroundColor: colors.white,
    width: '83%',
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },

  searchInput: {
    flex: 1,
    color: colors.mainColor,
    paddingLeft: 10,
  },
  searchShadowBox: {
    borderRadius: Border.br_base,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 0,
  },
  iconLayout: {
    width: 80,
    height: 80,
    
  },
})

export default SerachView