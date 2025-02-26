import React, { useState } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { useLanguage } from "../../../LanguageContext"
import { noperson, star } from "../../utils/Images"
import { colors } from "../../utils/colors"
import { globalStyle, responsiveHeight, responsiveWidth } from "../../utils/GlobalStyle"
import Animated, {useAnimatedStyle, interpolate, SharedValue} from 'react-native-reanimated';
import ServiceModal from "./ServiceModal"


interface DriverAdCardProps{
    id: string
    driverName: string;
    serviceType: string;
    dropOff: string;
    image: string;
    rate: string;
    selected: boolean;
    index: number;
    x: SharedValue<number>;
    SIZE: number;
    SPACER: number;
    price: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const DriverAdCard: React.FC<DriverAdCardProps> = ({
    id,
    driverName,
    dropOff,
    image,
    rate,
    serviceType,
    selected,
    index,
    x,
    SIZE,
    price
})=>{

    const { isArabic, t } = useLanguage()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const size = SIZE
    const onPress = ()=>{
        // console.warn('pressed')
        setIsOpen(true)
    }

    let current_image = image ? { uri: image } : noperson

    const style = useAnimatedStyle(() => {
        const scale = interpolate(
          x.value,
          [(index - 2) * size, (index - 1) * size, index * size],
          [0.9, 1, 0.9],
        );
        return {
          transform: [{scale}],
        };
      });
    
    let serviceContent = ''
    switch(serviceType){
        case "school":
            serviceContent = t('ServiceOneTypeOne')
            break;
        case "university":
            serviceContent = t('ServiceOneTypeTwo')
            break;
        case "employees":
            serviceContent = t('ServiceOneTypeThere') 
            break;
        default:
            serviceContent = t('ServiceOneTypeFour')
            break;
    }


    return(
        <>
        <ServiceModal 
            OpenServiceDetails={isOpen}
            setOpenServiceDetails={setIsOpen}
            selectedDriverID={id}
        />
        <AnimatedPressable 
            style={[
                styles.cardContainer, 
                style,
                {width:  responsiveWidth(330)},
                isArabic && styles.imageTextContainerAr,
                selected && styles.selected
            ]}
            onPress={onPress}
        >
            <View style={[styles.imageTextContainer, isArabic && styles.imageTextContainerAr,{
                // backgroundColor:"#0f0"
            }]}>
                <Image 
                    source={current_image} 
                    style={styles.cardImage} 
                    resizeMode="cover"
                />
                <CardTextView 
                    serviceType={serviceContent}
                    driverName={driverName}
                    dropOff={dropOff}
                    rate={rate}
                    // price={price}
                />
            </View>
            {/* <RateView rate={rate} /> */}
        </AnimatedPressable>
        </>
    )
}



/* DRIVER NAEME, DROP OFF AND SERVICE TYPE VIEW INSIDE DRIVER AD CARD */
const CardTextView: React.FC<{
        serviceType: string,
        dropOff: string,
        driverName: string,
        rate:string,
        price?:string
    }> = ({
        serviceType,
        driverName,
        dropOff,
        rate,
        price
    })=>{

    const { isArabic,t } = useLanguage()

    return(
    <View style={[styles.textContainer, isArabic && styles.textContainerAr]}>
      <View style={[styles.driverInfoContainer,{
        flexDirection:isArabic ? 'row-reverse' : 'row',

      }]}>
        <Text style={styles.driverName}>{driverName}</Text>
        <RateView rate={rate} />
        </View>
        <View style={[
            styles.serviceTextView, 
            isArabic && styles.imageTextContainerAr
            ]}>
            <Text style={styles.cardTitle}>{t('textInputone')}:</Text>
            <Text 
                ellipsizeMode="tail" 
                numberOfLines={1} 
                style={[
                    styles.serviceTypeText,
                    isArabic && styles.ar_margin
                    ]}>
                {serviceType}
            </Text>
        </View>
        <View 
            style={[
                styles.serviceTextView, isArabic && 
                styles.imageTextContainerAr
                ]}>
            <Text style={styles.cardTitle}>{t('dropOff_places')}:</Text>
            <Text numberOfLines={1} style={[
                styles.cardText,isArabic && 
                styles.ar_margin
                ]}>
                {dropOff}   
            </Text>
        </View>
        <View style={[
            styles.serviceTextView, 
            isArabic && styles.imageTextContainerAr
            ]}>
            <Text style={styles.cardTitle}>{t('Price')}:</Text>
            <Text 
                ellipsizeMode="tail" 
                numberOfLines={1} 
                style={[
                    styles.cardText,isArabic && 
                    styles.ar_margin
                    ]}>
                {'0'}
            </Text>
        </View>
    </View>
    )
}

const RateView: React.FC<{rate: string}> = ({rate})=>{
    const { isArabic } = useLanguage()

    return(
        <View style={[styles.starView, isArabic && styles.starViewAr]}>
            <Text style={styles.rateText}>{rate}</Text>
            <Image 
                source={star} 
                style={[styles.star, isArabic && styles.ar_margin]} 
            />
        </View>
    )
}




const styles = StyleSheet.create({
    cardContainer: {
        width: responsiveWidth(330),
        height:responsiveHeight(120),
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 15,
        padding: 12,
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    selected:{
        borderColor: colors.mainColor,
    },
    cardImage: {
        width: responsiveWidth(75),
        height: responsiveHeight(92),
        borderRadius: 10
    },
    imageTextContainer:{
        flexDirection: 'row',
        flex: 1,
    },
    imageTextContainerAr:{
        flexDirection: 'row-reverse'
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
    cardTitle: {
       ...globalStyle.AbelFont,
       color: colors.textcolor,
       fontSize: 12,
    },
    cardText:{
        ...globalStyle.AbelFont,
        color: colors.black,
        fontSize: 11,
        marginLeft: 5,
        maxWidth: responsiveWidth(135),
        marginRight: 0,
    },

    driverInfoContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 2,
        // backgroundColor:"#0f0"
      },
      driverName: {
        ...globalStyle.AbelFont,
        color: colors.mainColor,
        fontSize: 15,
      },
    serviceTextView: {
        flexDirection: 'row', 
        marginTop: 3,
        alignItems: 'center'
    },
    serviceTypeText: {
        backgroundColor: colors.light,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        color: colors.mainColor,
        marginLeft: 5,
        marginRight: 0,
        textAlign: 'right',
        fontSize: 11,
        marginBottom: 0
    },
    ar_margin: {
      marginLeft: 0,
      marginRight: 5
    },
    textContainer: {
        flex: 1,
        // backgroundColor:'#0f0',
        flexDirection: 'column', 
        marginLeft: 10, 
        alignItems:'flex-start',
        marginRight: 0
    },
    textContainerAr: {
        alignItems:'flex-end',
        marginLeft: 0,
        marginRight: 10,
       
    },
    rateText:{
        fontSize: 13, 
        color: colors.textcolor
    }
})


export default React.memo(DriverAdCard)
