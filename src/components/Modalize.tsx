import React from "react";
import { Image, ScrollView, StyleSheet, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback , Platform} from "react-native";
import { colors } from "../utils/colors";
import { modalizeheader } from "../utils/Images";

interface ModalizeType {
  children?: React.ReactNode;
}

const Modalize: React.FC<ModalizeType> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.modalize}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image
            source={modalizeheader}
            style={styles.iconheader}
            resizeMode="contain"
          />
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Modalize;

const styles = StyleSheet.create({
  modalize: {
    overflow: "hidden",
    width: "100%",
    // minHeight: 220,
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // justifyContent: "center",
  },
  iconheader: {
    alignSelf: "center",
    marginBottom: 20,
  },
});

