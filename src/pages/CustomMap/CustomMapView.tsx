import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { setRidercurrentLocation } from '../../redux/locationSlice';
import { colors } from '../../utils/colors';
import LottieView from 'lottie-react-native';
import { lodaingSpinner } from '../../utils/Images';
import { Image } from "expo-image";
import mapStyle from '../../../constant';
const { width, height } = Dimensions.get('window');

const CustomMapView = ({ DriverArr, mapRegion, setMapRegion, loading, setloading, handleMapPress }: any): React.JSX.Element => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You should Allow the app to use your current location ', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        const currentLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.050,
          longitudeDelta: 0.050,
        };
        dispatch(setRidercurrentLocation({ latitude: currentLocation.latitude, longitude: currentLocation.longitude }));
        setMapRegion(currentLocation);
      }
    } catch (error) {
      console.warn('Error getting location: ', error);
      setloading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  
  return (
    <View style={styles.container}>
      {loading ? (
        <LottieView
          autoPlay
          style={styles.loading}
          source={lodaingSpinner}
        />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={mapRegion}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onLongPress={handleMapPress}
        >
          <Circle
            center={mapRegion}
            radius={700}
            strokeWidth={0.5}
            strokeColor={colors.mainColor}
            fillColor={'transparent'}
          />
          {DriverArr.map(({driver, index}:any) => (
            <Marker
              key={index}
              coordinate={{
                latitude: driver.location.coordinates[0],
                longitude: driver.location.coordinates[1],
              }}
              title={driver.username}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  loading: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default CustomMapView;
