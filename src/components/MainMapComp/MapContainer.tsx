import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet, Animated, Dimensions, Platform, ScrollView } from "react-native";
import CustomMarker from "./CustomMarker";
import { colors } from "../../utils/colors";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { useLanguage } from "../../../LanguageContext";
import { setRidercurrentLocation } from '../../redux/locationSlice';
import { RootState } from "../../redux";
import { mapStyle } from "../../../GlobalStyles";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;
const SPACING_FOR_CARD_INSET = width * 0.1 - 20;


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

const MapContainer = ({ driverArr, mapAnimation }: { driverArr: DriverPlace[], mapAnimation: Animated.Value }) => {
  const mapRef = useRef<MapView>(null);
  const currentLocation = useSelector((state: any) => state?.location?.RidercurrentLocation);
  let mapIndex = 0;
const _scrollView = useRef<ScrollView>(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: currentLocation?.latitude || 0,
    longitude: currentLocation?.longitude || 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  
  const [userLocation, setUserLocation] = useState({
    latitude: currentLocation?.latitude,
    longitude:currentLocation?.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  useEffect(() => {
  mapAnimation.addListener(({ value }) => {
    let index = Math.floor(value / CARD_WIDTH + 0.3); 
    if (index >= driverArr.length) {
      index = driverArr.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }

    let regionTimeout;
    clearTimeout(regionTimeout);
     regionTimeout = setTimeout(() => {
      if (mapIndex !== index) {
        mapIndex = index;
        const { location } = driverArr[index];
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
}, [driverArr]);


  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      region={mapRegion}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton
      customMapStyle={mapStyle}
    >
      <Circle
        center={mapRegion}
        radius={50}
        strokeWidth={0.5}
        strokeColor={colors.mainColor}
        fillColor={'transparent'}
      />
      {driverArr.map((driver, index) => {
        const scaleStyle = {
          transform: [{ scale: mapAnimation.interpolate({
            inputRange: [
              (index - 1) * CARD_WIDTH,
              index * CARD_WIDTH,
              ((index + 1) * CARD_WIDTH),
            ],
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
          }) }],
        };
        return (
          <Marker
            key={driver._id}
            coordinate={{
              latitude: driver.location.coordinates[0],
              longitude: driver.location.coordinates[1],
            }}
            onPress={() => { /* Handle marker press */ }}
          >
            <CustomMarker img={driver.image} scaleStyle={scaleStyle} />
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapContainer;
