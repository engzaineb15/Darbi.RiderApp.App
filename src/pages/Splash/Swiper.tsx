import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width * 0.65;

interface Props {
  data: { image: any }[];
}

const MyCarousel: React.FC<Props> = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [20, 0, 20],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 2, 0.5],
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.94, 1, 0.94],
    });
    return (
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View
          style={[
            styles.containerImage,
            { transform: [{ translateY }, { scale }], opacity },
          ]}
        >
          <Image source={item} style={styles.imagestyle} resizeMode="contain" />
        </Animated.View>
      </View>
    );
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        setCurrentIndex(
          Math.round(event.nativeEvent.contentOffset.x / ITEM_SIZE)
        );
      },
    }
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 70  }}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        bounces={false}
        onScroll={onScroll}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: index === currentIndex ? 1 : 0.5 },
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "67%",
    width: "100%",
  },
  pagination: {
    flexDirection: "row",
  },
  dot: {
    width: 6.52,
    height: 6.52,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 23.47,
    height: 6.5,
    borderRadius: 5.22,
    backgroundColor: colors.white,
  },
  containerImage: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "90%",
    height: "100%",
  },
  imagestyle: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default MyCarousel;
