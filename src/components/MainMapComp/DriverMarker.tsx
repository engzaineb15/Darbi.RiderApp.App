import React from 'react';
import { Animated } from 'react-native';
import { Marker } from 'react-native-maps';

interface DriverMarkerProps {
  driver: any;
  scaleStyle?: any;
  onPress: (id: string) => void;
}

const DriverMarker: React.FC<DriverMarkerProps> = ({ driver, scaleStyle, onPress }) => {
  return (
    <Marker
      coordinate={{
        latitude: driver.location.coordinates[1],
        longitude: driver.location.coordinates[0],
      }}
      onPress={() => onPress(driver._id)}
    >
      <Animated.View style={[{ width: 55, height: 55, borderRadius: 10, overflow: 'hidden' }, scaleStyle]}>
        <Animated.Image
          source={{ uri: driver.image }}
          style={{ width: 55, height: 55, borderRadius: 10, borderWidth: 1.2, borderColor: 'blue' }}
        />
      </Animated.View>
    </Marker>
  );
};

export default DriverMarker;
