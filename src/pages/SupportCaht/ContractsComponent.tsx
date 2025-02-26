
import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, StatusBar, Platform, Animated, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { globalStyle } from "../../utils/GlobalStyle";
import { useLanguage } from "../../../LanguageContext";
import { colors } from "../../utils/colors";
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import useApi from "../../Api/useApi";
import { useSelector } from "react-redux";
import ChatSupportMainContractCard from "./ChatSupportMainContractCard";

const { width } = Dimensions.get('window');

export enum ContractStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  ONHOLD = 'on_hold'
}

const ContractsComponent: React.FC<{
  contracts: any[];
  loading: boolean;
  selectedContractStatus: ContractStatus | 'all';
  setSelectedContractStatus: (status: ContractStatus | 'all') => void;
  loadingFooter: boolean;
  hasNext: boolean;
}> = ({ contracts, loading, selectedContractStatus, setSelectedContractStatus, loadingFooter, hasNext }) => {
  const { t, isArabic } = useLanguage();
  const [contractModalVisible, setContractModalVisible] = useState(false);
  
  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent={true} barStyle={'dark-content'} />
      <View style={styles.componentContainer}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.mainColor} />
          </View>
        ) : contracts.length === 0 ? (
          <Text style={[globalStyle.AbelFont, styles.noContractsText]}>{t('No_contracts')}</Text>
        ) : (
          <ScrollView>
            {contracts.map((contract) => (
              <ChatSupportMainContractCard
                key={contract?._id}
                contract={contract}
                contractModalVisible={contractModalVisible}
                setContractModalVisible={setContractModalVisible}
              />
            ))}
            {loadingFooter && (
              <ActivityIndicator size="small" color={colors.mainColor} style={styles.footerLoader} />
            )}
            {!hasNext && contracts.length > 0 && (
              <Text style={[globalStyle.AbelFont, styles.noMoreContractsText]}>{t('No more contracts')}</Text>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
};


export default ContractsComponent;

const styles = StyleSheet.create({
  basicContainer: {
    backgroundColor: colors.otpBG,
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  HeaderStyle: {
    padding: 20,
    zIndex: 2,
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 3,
  },
  dropdownButton: {
    backgroundColor: colors.white,
  
    borderColor: colors.mainColor,
    padding: 10,
    borderRadius: 5,
    width: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  dropdownButtonActive: {
    borderColor: colors.mainColor,
  },
  dropdownButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    marginTop: 5,
    top: '100%',
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownList: {
    maxHeight: 250,
  },
  dropdownItem: {
    padding: 10,
    // borderBottomWidth: 1,
    borderBottomColor: colors.grayHeader,
  },
  dropdownItemText: {
    textAlign: 'center',
  },
  componentContainer: {
    marginTop:15,
    flex: 1,
  },
  noContractsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  noMoreContractsText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  }
});
