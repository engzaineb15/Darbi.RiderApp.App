import React from 'react';
import { View, Text, Platform, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { calendarIcon, note, starbalck } from '../../utils/Images';
import { colors } from '../../utils/colors';
import { globalStyle } from '../../utils/GlobalStyle';
import { useLanguage } from '../../../LanguageContext';

const { width, height } = Dimensions.get('window');

const ServiceDetailsInfo = ({ myContractDetails, setaddNoteModal }: any) => {
    const { t, isArabic } = useLanguage();
    const serviceType = myContractDetails?.service;

    return (
        <>
            <Text style={[{ fontSize: 17 }, globalStyle.AbelFont]}>
                {t('Trip_details')}
            </Text>

            <View style={{}}>
                <View style={[{ marginTop: 10, }, styles.card]}>
                    <View style={[styles.chatItem, { flexDirection: isArabic ? 'row-reverse' : 'row' }]}>
                        <View style={[styles.IconStyle, { alignSelf: isArabic ? 'flex-end' : 'flex-start', }]}>
                            <Image source={starbalck} contentFit="contain" style={{ width: 15, height: 15 }} />
                        </View>
                        <Text style={[styles.lastMessage, globalStyle.AbelFont, {
                            fontSize: 12, lineHeight: 20, alignSelf: isArabic ? "flex-end" : "flex-start",
                        }]} >{t('Transport_type')}</Text>
                        <Text style={[styles.lastMessage, globalStyle.AbelFont, { fontSize: 13, lineHeight: 20, color: colors.black, alignSelf: isArabic ? "flex-end" : "flex-start", }]} >{serviceType === 'shared' ? t('ServiceTwoTypeThere') : serviceType === 'privte' ? t('ServiceTwoTypeTwo') : t('ServiceTwoTypeOne')}</Text>


                        <View style={[styles.IconStyle, { alignSelf: isArabic ? 'flex-end' : 'flex-start', }]}>
                            <Image source={calendarIcon} contentFit="contain" style={{ width: 15, height: 15 }} />
                        </View>
                        <Text style={[styles.lastMessage, globalStyle.AbelFont, { fontSize: 12, lineHeight: 20, alignSelf: isArabic ? "flex-end" : "flex-start", }]} >{t('Delivery_to')}</Text>
                        <Text style={[styles.lastMessage, globalStyle.AbelFont, { fontSize: 13, lineHeight: 20, color: colors.black, alignSelf: isArabic ? "flex-end" : "flex-start", }]}>
                            {myContractDetails?.paymentPeriod === 'weekly' ? t('Weekly') :
                                myContractDetails?.paymentPeriod === 'monthly' ? t('Monthly') :
                                    myContractDetails?.paymentPeriod === 'yearly' ? t('Yearly') :
                                        myContractDetails?.paymentPeriod === 'full' ? t('Full') : t('')}
                        </Text>

                        <View style={[styles.IconStyle, { alignSelf: isArabic ? "flex-end" : "flex-start", }]}>
                            <Image source={note} contentFit="contain" style={{ width: 15, height: 15 }} />
                        </View>
                        <Text style={[styles.lastMessage, globalStyle.AbelFont, { fontSize: 12, lineHeight: 20, alignSelf: isArabic ? "flex-end" : "flex-start", }]} >{t('Notes')}</Text>
                        <Pressable
                            onPress={() => { setaddNoteModal(true) }}
                            style={{
                                backgroundColor: colors.light,
                                borderRadius: 5,
                                paddingHorizontal: 2,
                            }}>
                            <Text style={[globalStyle.AbelFont, { fontSize: 11, lineHeight: 15, textAlign: isArabic ? 'right' : 'left', color: colors.mainColor }]} >{t('Click_notes')}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>




        </>
    );
};

const styles = StyleSheet.create({
    basicContainer: {
        flex: 1,
        backgroundColor: colors.whiteLight,
    },
    containerView: {
        flex: 1,
        backgroundColor: colors.whiteLight,
        paddingHorizontal: 10,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 80 : 40,
        height: Platform.OS === 'ios' ? 50 : 270,
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        // paddingBottom: 10,
        backgroundColor: colors.mainColor,
    },
    pageName: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.white,
    },
    container: {
        flex: 1,
        // backgroundColor: "#0d0",
        alignItems: "center",

    },
    title: {
        fontSize: 18,
        marginBottom: 15,
        alignSelf: "center",
    },
    card: {
        width: width * 0.9,
        // height: height/8.5,
        // marginHorizontal:5,
        padding: 5,
        shadowColor: "rgba(0, 0, 0, 0.05)",
        // borderColor: "rgba(238, 238, 238, 1)",
        // borderStyle: "solid",
        // borderBottomWidth: 1,
        borderRadius: 10,
        // backgroundColor: "#FF0",
        // marginBottom:20,
        alignSelf: 'center'

    },
    btn: {
        marginTop: 20,
    },
    textButton: {
        color: colors.white,
        fontSize: 16,
    },
    iconLayout: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    smallCard: {
        width: width * 0.26,
        height: height / 7.8,
        paddingVertical: 5,

        paddingHorizontal: 10,
        padding: 5,
        shadowColor: "rgba(0, 0, 0, 0.05)",
        borderColor: "rgba(238, 238, 238, 1)",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#FFF",
        // marginTop:10,
        marginHorizontal: 5,


    },
    customViewSmall:
    {
        alignSelf: 'center',
        width: width * 0.82,
        height: height / 8,
        marginVertical: 10,
        // backgroundColor:"#00f",
        // marginHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center'


    },
    IconStyle: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: colors.lightBackgray,

    },
    smallIcon:
    {
        width: 20,
        height: 20
    },

    CustomIcon: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: colors.mainColor,

    },
    chatItem: {
        alignItems: 'center',
        // padding: 10,

    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 15,
        // borderRadius: 25,
        marginLeft: 10,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 13,
        color: colors.textCutom

    },
    nametiemStyleCar: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontSize: 16,
        color: '#888',
        lineHeight: 30,
    },
    timeText: {
        fontSize: 12,
        color: '#888',
    },
    nametiemStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        color: colors.textCutom
    },
    container_btn_PageName: {
        marginTop: 10,
    },
    bagsName: {
        fontSize: 25,
        fontWeight: "bold",
    },
    cardPoint: {
        width: width * 0.82,
        height: height / 8,
        // marginHorizontal:5,
        padding: 10,
        shadowColor: "rgba(0, 0, 0, 0.05)",
        // borderColor: "rgba(238, 238, 238, 1)",

        borderStyle: "solid",
        // borderWidth: 1,
        borderRadius: 15,
        backgroundColor: colors.lightBackgray,
        alignSelf: 'center'

    },
    avatarPoint: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        width: 70,
        height: 70,
        borderRadius: 25,
        // borderRadius: 25,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoMap: {
        width: 70,
        height: 70,
        borderRadius: 15,
    }
});

export default ServiceDetailsInfo;
