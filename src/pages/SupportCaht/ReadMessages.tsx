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
import ContantUsHeader from '../../components/SupportChatCom/ContantUsHeader';
import ContactUsMainComp from '../../components/SupportChatCom/ContactUsMainComp';
import ReadMessagesHeader from '../../components/SupportChatCom/ReadMessagesHeader';
import ReadMessagesMainComp from '../../components/SupportChatCom/ReadMessagesMainComp';


const ReadMessages = () => {
  const { post ,get} = useApi();
  const [looading, setloading] = useState(true);
  const [Chats, setChats] = useState([])
  const [loadingTicket, setLoadingTicket] = useState<boolean>(false)
  const { navigate } = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loadingFooter, setLoadingFooter] = useState(false)
  
  const createNewTicket = async () => {
    try {
      setLoadingTicket(true)
      const response = await post("support/message/creat-room", {});

      setLoadingTicket(false)
      let oldChats = [...Chats]
      oldChats.push({lastMessage: null, room: response.data?._id})
      setChats(oldChats)
      navigate('SupportChatMainPage', {roomId: response.data?._id})
    //
    } catch (error: any) {
      console.error("Failed to create new ticket:", error.response?.data || error.message);
      setLoadingTicket(false)

    }
  };
  const fetchTickets = async (refresh: boolean) => {
    if(refresh)
      setRefreshing(true)
    
    else
      setloading(true);
    try {
      const response = await get("support/message/rooms");
      setChats(response.data.data);
      setHasNext(response.data.pagination.hasNextPage)
      console.log("response.data  ", response.data.data);
      setloading(false);
      setRefreshing(false)
    } catch (err) {
      setloading(false);
      setRefreshing(false)
      console.log(err)
    }
  };
  useEffect(() => {   
      fetchTickets(false);
  }, []);

  // /support/message/rooms?page=1
  const onEndReached = async()=>{
    if(hasNext) 
      try{
        setLoadingFooter(true)
        let res = await get(`support/message/rooms?page=${page+1}`)
        setPage(page+1)
        setChats([...Chats, ...res.data.data])
        setHasNext(res.data.pagination.hasNextPage)
        setLoadingFooter(false)
      }catch(e){
        console.warn(e)
        setLoadingFooter(false)

      }
  }

  return (
    <View style={styles.basicContainer}>
      <StatusBar barStyle={"dark-content"} backgroundColor={'transparent'} />
      <ReadMessagesHeader
          createNewTicket={createNewTicket}
          loadingTicket={loadingTicket}
      />
      <View style={[styles.ContainerView,{
    marginTop: Platform.OS === 'ios' ? 20 : 10,

      }]}>


        <ReadMessagesMainComp  

      />
      
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

export default ReadMessages;
