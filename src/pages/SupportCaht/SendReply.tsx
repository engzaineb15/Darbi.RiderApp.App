import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '../../utils/colors';
import { globalStyle } from '../../utils/GlobalStyle';
import 'moment/locale/en-gb';
import 'moment/locale/ar';
import { useTranslation } from 'react-i18next';
import SupportChatListItem from '../../components/SupportChatCom/SupportChatListItem';
import SupportChatListHeader from '../../components/SupportChatCom/SupportChatListHeader';
import Loading from '../../components/Loading';
import useApi from '../../Api/useApi';
import { useNavigation } from '@react-navigation/native';
import ListFooter from '../../components/ListFooter';
// import SendReply from '../../components/SupportChatCom/SendReply';
import TellUsMainComp from '../../components/SupportChatCom/TellUsMainComp';
import SendReplyComp from '../../components/SupportChatCom/SendReplyComp';



const TellUsMore = () => {
  const { post ,get} = useApi();
  const [looading, setloading] = useState(true);
  const [Chats, setChats] = useState([])
  const [loadingTicket, setLoadingTicket] = useState<boolean>(false)
  const { navigate } = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loadingFooter, setLoadingFooter] = useState(false)

  return (
    <View style={styles.basicContainer}>
      <StatusBar barStyle={"dark-content"} backgroundColor={'transparent'} />
      <SendReply />
      <View style={[styles.ContainerView,{
    marginTop: Platform.OS === 'ios' ? 20 : 10,

      }]}>


  <SendReplyComp />

    
      </View>
    </View>
  );
};






const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ContainerView: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: 10,
  },
  emptyView: {
    alignSelf: 'center', 
    marginTop: 20 
  }
});

export default TellUsMore;
