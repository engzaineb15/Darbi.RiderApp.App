import { Marker } from "react-native-maps"
import DriverShape from "./DriverShape"

interface MapMarkerProps{
    location: {
        coordinates: number[]
    },
    selected: boolean,
    image: string
}

const MapMarker: React.FC<MapMarkerProps> = ({location, selected, image})=>{


    return(
        <Marker 
            coordinate={{
                latitude: location.coordinates[0],
                longitude: location.coordinates[1]
            }}
        >
            <DriverShape  image={image} selected={selected}/>
        </Marker>
        
    )
}


export default MapMarker