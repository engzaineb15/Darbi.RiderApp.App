import React from 'react';
import { Animated } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../../utils/colors';

const CustomMarker = ({ img, scaleStyle }: { img: string; scaleStyle?: any }) => (
  <Animated.View
    style={[{ width: 55, height: 55, borderRadius: 10, overflow: 'hidden' }, scaleStyle]}
  >
    <Animated.Image 
      source={{ uri: img }} 
      contentFit="cover"
      style={{ width: 55, height: 55, borderRadius: 10, borderWidth: 1.2, borderColor: colors.mainColor }}
    />
  </Animated.View>
);

export default CustomMarker;
