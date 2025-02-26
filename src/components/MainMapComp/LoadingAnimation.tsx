import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const LoadingAnimation = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.mainColor} />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' },
});

export default LoadingAnimation;
