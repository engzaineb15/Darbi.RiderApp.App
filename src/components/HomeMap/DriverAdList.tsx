import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, { runOnJS, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import DriverAdCard from "./DriverAdCard";
import { responsiveWidth } from "../../utils/GlobalStyle";

interface DropOff {
    _id: string;
    placeId: string,
    name: string
}

export interface DriverPlace {
    _id: string;
    username: string;
    image: string;
    review: number;
    location: {
      type: string;
      coordinates: number[];
    };
    dropOffs: DropOff[];
    priceRange: {
        max: number;
        min: number;
    };
    transportType: string;  
}


interface DriverAdListProps{
    allDrivers: DriverPlace[],
    onChangeIndex: (index: number)=>void
}

const DriversAdList: React.FC<DriverAdListProps> = ({
    allDrivers,
    onChangeIndex
})=>{

    const {width} = useWindowDimensions()
    const [currentIndex, setCurrentIndex] = useState<number>(1)
    const x = useSharedValue<number>(0);
    const offSet = useSharedValue<number>(0);
    const SIZE = responsiveWidth(width * 0.90);
    const SPACER = (responsiveWidth(width) - SIZE) / 1.8;

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
          x.value = event.contentOffset.x;
        },
        onMomentumEnd: e => {
          offSet.value = e.contentOffset.x;
          runOnJS(setCurrentIndex)(Math.round(e.contentOffset.x / (SIZE)+1));
          runOnJS(onChangeIndex)(Math.round(e.contentOffset.x / (SIZE)+1));
        },
      });

    //   console.log(allDrivers?.priceRange)
    return(
        <View style={{position: 'absolute', bottom: 25,
            left: 0, 
            right: 0,
            // paddingHorizontal: SPACER / 2
        }}>
            <Animated.ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={SIZE}
                bounces={false}
                decelerationRate={'fast'}
                scrollEventThrottle={16}
                onScroll={onScroll}
            >
            {allDrivers.map((driver, index)=>{
                if(!driver._id){
                    return <View style={{width: SPACER}} key={index}/>
                }else
                return(
                <DriverAdCard 
                    key={driver._id}
                    selected={currentIndex === index}
                    id={driver._id}
                    driverName={driver.username}
                    // price={price}
                    dropOff={driver.dropOffs.map(d=>d.name).join(' - ')}
                    image={driver.image}
                    rate={driver.review.toString()}
                    serviceType={driver.transportType}
                    index={index}
                    SIZE={SIZE}
                    SPACER={SPACER}
                    x={x}
                />
                )
            })}
            </Animated.ScrollView>
        </View>
    )
}

export default DriversAdList