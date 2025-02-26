import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../utils/colors';
import { Image } from 'expo-image';
import { earn, lodaingSpinner, loss, puse } from '../../utils/Images';
import { globalStyle, responsiveWidth } from '../../utils/GlobalStyle';
import { useLanguage } from '../../../LanguageContext';
import LottieView from 'lottie-react-native';

enum TransactionType {
  CONTRACT = 'contract',
  FEE = 'fee',
  WITHDRAW = 'withdraw',
  REFUND = 'refund',
}

interface WalletMainComponentProps {
  AllTransactions: {
    loading: boolean;
    action: string;
    amount: string;
    date: string;
    receiverId : string;
    senderId : string;
    status : string
  }[];
}

const WalletMainComponent: React.FC<WalletMainComponentProps> = ({ AllTransactions,userId ,loading}) => {
  const { t, isArabic } = useLanguage();
  const { width } = useWindowDimensions();
  console.log(AllTransactions)

  const getTransactionTypeText = (action: string) => {
    switch (action as TransactionType) {
      case TransactionType.CONTRACT:
        return isArabic ? 'دفع للسائق' : 'Paid to driver';
      case TransactionType.FEE:
        return isArabic ? 'رسوم التطبيق' : 'App fee';
      case TransactionType.WITHDRAW:
        return isArabic ? 'سحب' : 'Withdrawal';
      case TransactionType.REFUND:
        return isArabic ? 'استرداد' : 'Refund';
      default:
        return action;
    }
  };
  
  const formatLargeNumber = (num: number) => {
    const fixedNum = Number(num.toFixed(2));
    if (fixedNum >= 1e9) return (fixedNum / 1e9).toFixed(2) + 'B';
    if (fixedNum >= 1e6) return (fixedNum / 1e6).toFixed(2) + 'M';
    if (fixedNum >= 1e3) return (fixedNum / 1e3).toFixed(2) + 'K';
    return fixedNum.toFixed(2);
  };
  

  
  return (
    <>
      <View style={[styles.TextView, { flexDirection: isArabic ? 'row-reverse' : 'row' }]}>
        <Text style={[globalStyle.AbelFont, styles.mainText]}>{t("All_transactions")}</Text>
        <Text style={[globalStyle.AbelFont, styles.secondText]}>{AllTransactions?.length}{' '}{t("Transactions")}</Text>
      </View>

      {loading ? (
        <LottieView
          autoPlay
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            justifyContent: "center",
            flex: 1,
          }}
          source={lodaingSpinner}
        />
      ) : (
        <>
      <ScrollView showsVerticalScrollIndicator={false}>

        {AllTransactions.map((transaction, index) => (
          <View key={index} style={styles.MainBoxStyle}>
            <View style={[styles.BigBoxStyle, { flexDirection: isArabic ? 'row-reverse' : 'row' }]}>
              <View style={[styles.containerViewTwxt, { flexDirection: isArabic ? 'row' : 'row-reverse' }]}>
                <View style={styles.TextAllView}>
                  <Text style={[globalStyle.AbelFont, styles.dateText]}>{getTransactionTypeText(transaction?.action)}</Text>
                  <Text style={[globalStyle.AbelFont, styles.MonySmallText]}>
                    {transaction?.receiverId === userId  ? t('You_add') : t('You_spent')}
                    {transaction.amount}{' '}{t('currency')}
                  </Text>
                </View>
                <Image source={transaction?.status === "completed" ? earn : transaction?.status === "failed" ? loss : puse } contentFit='contain' style={[styles.earnIcon, { 
                  marginLeft: isArabic ? 5 : 0, marginRight: isArabic ? 0 : 5 
                  }]} />
              </View>
              <Text style={[globalStyle.AbelFont, transaction?.receiverId === userId ? styles.earnText : styles.LossText, styles.amountText,]}numberOfLines={1}>
  {transaction?.receiverId === userId ? ' + ' : ' - '}
  {formatLargeNumber(parseFloat(transaction?.amount))} {t('currency')}
</Text>

            </View>
          </View>
        ))}

        {AllTransactions?.length == 0 && (
          <View 
          style={{
            alignItems:'center',
            flex:1
          }}
          >
          <Text style={[globalStyle.AbelFont,{ alignSelf: "center", marginTop: 20,fontSize:18,color:colors.graytext } ]} >{t('noTransactions')}</Text>
          </View>
        )}
      </ScrollView>

        </>
      )}

    </>
  );
}

export default WalletMainComponent;

const styles = StyleSheet.create({
  TextView: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainText: {
    fontSize: 19,
  },
  secondText: {
    fontSize: 14,
    color: colors.mainColor,
  },
  MainBoxStyle: {
    width:responsiveWidth(360),
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.017)",
    borderColor: "rgba(238, 238, 238, 20)",
    borderRadius: 10,
   padding:10,
    borderWidth: 1,
    marginBottom: 20,
    alignSelf: 'center',
  },
  SmallBoxView: {
    // backgroundColor:"#0f0",
    borderRadius: 5,
    alignSelf: 'flex-end',
    // paddingHorizontal: 5,
    // paddingVertical: 5,
  },
  BoxSmallText: {
    fontSize: 15,
    color: colors.graybtn,
  },
  dateTimeContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:"#0f0",
  },
  earnIcon: {
    width: 40,
    height: 40,
    // backgroundColor:"#0f0",
  },
  TextAllView: {
    width: 200,
    // marginRight: 5,
    paddingHorizontal:5
  },
  BigBoxStyle: {
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 5,
  },
  containerViewTwxt: {
    // backgroundColor:"#0f0",
    justifyContent: 'flex-end',
    alignItems: "center",
    // padding: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.black,
  },
  MonySmallText: {
    fontSize: 12,
    lineHeight: 30,
    color: colors.black,
  },
  earnText: {
    fontSize: 15,
    // marginLeft: 5,
    color: colors.mainColor,
  },
  LossText: {
    fontSize: 15,
    // marginLeft: 5,
    color: colors.redd,
  },
  amountText: {
    flexShrink: 1,
    marginLeft: 5,
  },
  
});
