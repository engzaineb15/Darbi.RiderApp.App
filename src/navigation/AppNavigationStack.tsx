
import React, { useEffect ,useRef,useState} from "react";
import NaviagtionStack from "./NavigationStack";
import { useSelector } from "react-redux";
import LottieView from 'lottie-react-native';
import MainStack from "./MainStack";
import { lodaingSpinner } from "../utils/Images";
import { useLanguage } from "../../LanguageContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppNavigationStack = () => {
  const {changeLanguage} = useLanguage();
  const token = useSelector((state: any) => state.user.token);
  const [ langLoading, setLangLoading] = useState<boolean>(true)
  const animation = useRef(null)
  const getLang = async () => {
    const value = await AsyncStorage.getItem('lang');
    if (value) {
        await changeLanguage(value);
    } 
    setLangLoading(false)
  }
  useEffect(() => {
    getLang()
  }, []);

  return (
    <>

{langLoading ? (
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 100,
          height: 100,
          alignSelf:"center",
          justifyContent:"center",
          flex:1
        }}
      
        source={lodaingSpinner}
      />
     ) : (
      <>
 
      {token ? <MainStack /> : <NaviagtionStack />}
      </>

    )}

    </>
  );
};

export default AppNavigationStack;