import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const PlaceList = ({ places, onPlaceSelect }) => {
  return (
    <View style={styles.listContainer}>
      {places.map((place, index) => (
        <Pressable
          key={index}
          style={styles.placeItem}
          onPress={() => onPlaceSelect(place)}
        >
          <Text style={styles.placeText}>{place}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  placeItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  placeText: {
    fontSize: 17,
    color: 'black',
  },
});

export default PlaceList;
