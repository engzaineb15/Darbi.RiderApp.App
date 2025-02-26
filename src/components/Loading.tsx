import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

const Loading: React.FC  = ()=>(
    <View style={styles.loadingView}>
      <ActivityIndicator size={'small'} color={colors.mainColor}/>
    </View>
)


const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})


export default Loading