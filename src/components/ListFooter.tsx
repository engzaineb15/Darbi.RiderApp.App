import { ActivityIndicator } from "react-native"
import { colors } from "../utils/colors"

const ListFooter: React.FC<{loading: boolean}> = ({loading})=>{
    if(loading)
    return(
        <ActivityIndicator size={'small'} color={colors.mainColor}/>
    )
    else return null
  }
  


  export default ListFooter