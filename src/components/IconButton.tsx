import React, { FC } from 'react';
import {
  TouchableOpacity,
  Image,
  ImageStyle,
  ViewStyle,
  GestureResponderEvent,
  StyleProp,
  ImageSourcePropType,
} from 'react-native';
import { colors } from '../utils/colors';

interface IconButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  icon: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  onPress: (event: GestureResponderEvent) => void;
}

const IconButton: FC<IconButtonProps> = ({ containerStyle, icon, iconStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={[{ alignItems: 'center', justifyContent: 'center' }, containerStyle]}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={[{ width: 30, height: 30, tintColor: colors.white }, iconStyle]}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
