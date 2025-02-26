import React, { useState, useEffect } from 'react';
import { FlatList,Text, StyleSheet, Platform, KeyboardAvoidingView, SafeAreaView, StatusBar, View, ActivityIndicator } from 'react-native';
import { colors } from '../../utils/colors';
import ListFooter from '../../components/ListFooter';
import { useLanguage } from '../../../LanguageContext';
import { globalStyle } from '../../utils/GlobalStyle';
import useApi from '../../Api/useApi';
import SupoortChatInput from '../../components/SupportChatCom/SupoortChatInput';
import MessageSupportChatComp from '../../components/SupportChatCom/MessageSupportChatComp';
import SupportChatHeader from '../../components/SupportChatCom/SupportChatHeader';


const SupportChatMainPage = ({ route }: { navigation: any; route: any }) => {
  
  const { get } = useApi();
  const {t } = useLanguage();
  const { roomId } = route?.params;
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingFooter, setLoadingFooter] = useState(false)
 
  useEffect(()=>{
    //GET MESSAGES
    async function getMessages() {
      try{
        let res = await get(`support/message?roomId=${roomId}`)
        console.log("res.data", res.data)
        setMessages(res.data.data)
        setHasNext(res.data.pagination.hasNextPage)
      }catch(e){
        console.warn(e)
      }
    }
    getMessages()
  },[])


  const onEndReached = async()=>{
    if(hasNext)
      try{
        setLoadingFooter(true)
        let res = await get(`support/message?roomId=${roomId}&page=${page+1}`)
        setPage(page+1)
        setMessages([...messages, ...res.data.data])
        setHasNext(res.data.pagination.hasNextPage)
        setLoadingFooter(false)
      }catch(e){
        console.warn(e)
      }
  }


if(loading)
  return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'small'} color={colors.mainColor}/>
      </View>
  )


  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'transparent'} ></StatusBar>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <SupportChatHeader roomId={roomId}/>

          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <MessageSupportChatComp 
                item={item} 
              />
            )}
            keyExtractor={(item) => item._id}
            onEndReached={onEndReached}
            ListFooterComponent={()=><ListFooter loading={loadingFooter}/>}
            inverted
          />


          <SupoortChatInput 
            roomId={roomId}
            setMessages={setMessages}
            messages={messages}
          />
    </KeyboardAvoidingView>

  


    </SafeAreaView>

  );
};



export default SupportChatMainPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }
});









