import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated, Platform } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import DriverMarker from './DriverMarker';

interface MapViewComponentProps {
  mapRegion: any;
  userLocation: any;
  DriverArr: any[];
  mapAnimation: any;
  handleMapPress: (event: any) => void;
  onMarkerPress: (id: string) => void;
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({
  mapRegion,
  userLocation,
  DriverArr,
  mapAnimation,
  handleMapPress,
  onMarkerPress
}) => {
  const _scrollView = useRef(null);

  const interpolations = DriverArr.map((marker, index) => {
    const inputRange = [
      (index - 1) * 250,
      index * 250,
      (index + 1) * 250,
    ];
    return mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onLongPress={handleMapPress}
      >
        <Circle
          center={userLocation}
          radius={50}
          strokeWidth={0.5}
          strokeColor='blue'
          fillColor={'transparent'}
        />
        {DriverArr.map((driver, index) => (
          <DriverMarker
            key={driver._id}
            driver={driver}
            scaleStyle={{ transform: [{ scale: interpolations[index] }] }}
            onPress={onMarkerPress}
          />
        ))}
      </MapView>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        ref={_scrollView}
      >
        {DriverArr.map((driver) => (
          <DriverCard
            key={driver._id}
            driver={driver}
            onPress={onMarkerPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapViewComponent;
