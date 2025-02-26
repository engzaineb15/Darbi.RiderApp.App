import React, { useEffect, useRef } from "react";
import { Animated, Platform, ScrollView } from "react-native";
import MapView, { Marker, MarkerPressEvent } from "react-native-maps";
import CustomMarker from "../components/MainMapComp/CustomMarker";
import { SIZES } from "../../GlobalStyles";


interface DropOff {
    _id: string;
    placeId: string,
    name: string
  }
  interface DriverPlace {
    _id: string;
    username: string;
    image: string;
    review: number;
    location: {
      type: string;
      coordinates: [number, number];
    };
    dropOffs: DropOff[];
    transportType: string;
    count: number;
  
  }

interface MarkerComponentProps {
  DriverArr: DriverPlace[];
  userLocation:any
}

const CARD_HEIGHT = 80;
const CARD_WIDTH = SIZES.width * 0.65;
const SPACING_FOR_CARD_INSET = SIZES.width * 0.1 - 20;


const MarkerComponent = ({
  DriverArr,
  userLocation
}: MarkerComponentProps) => {

// Animation values
const mapRef = React.useRef<MapView>(null);
let mapIndex = 0;
let mapAnimation = new Animated.Value(0);
const _scrollView = useRef<ScrollView>(null);



useEffect(() => {
  mapAnimation.addListener(({ value }) => {
    let index = Math.floor(value / CARD_WIDTH + 0.3); 
    if (index >= DriverArr.length) {
      index = DriverArr.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }

    let regionTimeout;
    clearTimeout(regionTimeout);
     regionTimeout = setTimeout(() => {
      if (mapIndex !== index) {
        mapIndex = index;
        const { location } = DriverArr[index];
        const coordinate = {
          // latitude: parseFloat(location?.coordinates[0]),
          // longitude: parseFloat(location?.coordinates[1]),
          latitude: userLocation?.latitude,
          longitude:userLocation?.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        mapRef.current?.animateToRegion(coordinate, 350);
      }
    }, 10);
  });
}, [DriverArr]);



const interpolations = DriverArr?.map((marker, index) => {

  const inputRange = [
    (index - 1) * CARD_WIDTH,
    index * CARD_WIDTH,
    ((index + 1) * CARD_WIDTH),
    
  ];

  const scale = mapAnimation.interpolate({
    inputRange,
    outputRange: [1, 1.5, 1],
    extrapolate: 'clamp',
  });

  return  scale ;
});

const onMarkerPress = (mapEventData: MarkerPressEvent) => {
  const markerID = mapEventData._targetInst.return.key;
  // const markerID = mapEventData.id; 

  let x = (markerID * CARD_WIDTH) + (markerID * 20); 
  if (Platform.OS === 'ios') {
    x = x - SPACING_FOR_CARD_INSET;
  }

  if (_scrollView.current) {
    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }
}


  return (
    <>
      {DriverArr?.map((driver, index) => {
        const scaleStyle = {
          transform: [
            {
              scale: interpolations[index],
            },
          ],
        };
        return (
          <Marker
            key={driver._id}
            coordinate={{
              latitude: driver.location.coordinates[0],
              longitude: driver.location.coordinates[1],
            }}
            onPress={onMarkerPress}
          >
            <CustomMarker img={driver.image} scaleStyle={scaleStyle} />
          </Marker>
        );
      })}
    </>
  );
};

export default MarkerComponent;
