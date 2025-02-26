import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";

// Import your screens
import {
  BackHandler,
  I18nManager,
  Image,
  ImageStyle,
  StyleSheet,
} from "react-native";

import ChatsList from "../pages/BottomBar/ChatsList";
import MainMap from "../pages/BottomBar/MainMap";
import MyContracts from "../pages/BottomBar/MyContracts";
import MyTrip from "../pages/BottomBar/MyTrip";
import {
  tableCar,
  tableChat,
  tableHome,
  tableMore,
  tableWallet,
} from "../utils/Images";
import { colors } from "../utils/colors";
import More from "../pages/BottomBar/More";
import { useFocusEffect } from "@react-navigation/native";
import i18n from "../i18n";
import { useLanguage } from "../../LanguageContext";
import Home from "../pages/BottomBar/MainMap2";


const Tab = createMaterialBottomTabNavigator();

const NavigationBottomBarStack = () => {

  const {t, changeLanguage, isArabic} = useLanguage();
  
  


  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      };
    }, [])
  );

  const BottomTabDetalies = [
    { id: 4, name: 'More', component: More, icon: tableMore },
    { id: 3, name: 'MyContracts', component: MyContracts, icon: tableWallet },
    { id: 2, name: 'MyTrip', component: MyTrip, icon: tableCar },
    { id: 1, name: 'Chat', component: ChatsList, icon: tableChat },
    { id: 0, name: 'Home', component: Home, icon: tableHome },
  ];
  return (

    <Tab.Navigator
      barStyle={styles.bottomBar}
      activeColor={colors.active}
      inactiveColor={colors.disActive}
      activeIndicatorStyle={{ backgroundColor: colors.white }}
      initialRouteName={'Home'}
      backBehavior="initialRoute"
      sceneAnimationEnabled={true}
    >
      {BottomTabDetalies.sort((a, b) => isArabic ? (b.id - a.id): (a.id - b.id)).map((ele) => {
        return (
          <Tab.Screen
            
            key={ele.id}
            name={ele.name}
            component={ele.component}
            options={{
              
              tabBarIcon: ({ color, focused }) => (
                <Image
                  source={ele.icon}
                  style={
                    {
                      tintColor: focused
                        ? ele.icon !== tableHome
                          ? color
                          : undefined
                        : color,
                    } as ImageStyle
                  }
                  resizeMode="contain"
                />
              ),
              title: t(ele.name)
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default NavigationBottomBarStack;
const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    height: 60,
    justifyContent: "center",
  },
});
