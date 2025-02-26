import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';
import { globalStyle } from '../../utils/GlobalStyle';


export interface TripSchedule {
  _id: string;
  day: string;
  returnTime: string;
  tripTime: string;
}

export interface MyContractDetails {
  _id: string;
  tripsSchedule: TripSchedule[];
 
}

interface TripTimesProps {
  myContractDetails: MyContractDetails;
  t: (key: string) => string;
  isArabic: boolean;
}

const getDayName = (day: string, t: (key: string) => string) => {
  const days = {
    sun: 'Sunday',
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday'
  };
  return t(days[day as keyof typeof days] || day);
};



const TripTimes: React.FC<TripTimesProps> = ({ myContractDetails, t, isArabic }) => {
  const [expandedDays, setExpandedDays] = useState<{ [key: string]: boolean }>({});
  const toggleDayDetails = (dayId: string) => {
    setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  };
  
  return (
    <>
      <View style={[styles.header]}>
        <Text style={[{ fontSize: 17 }, globalStyle.AbelFont]}>
          {t('TripTimes')}
        </Text>
      </View>

     
      {myContractDetails?.tripsSchedule.map((trip: TripSchedule) => (
        <View key={trip._id} style={styles.tripContainer}>
          <View style={[styles.timeLineContainer, { flexDirection: isArabic ? 'row-reverse' : 'row' }]}>
            <View style={[styles.timeDetails, { alignItems: isArabic ? 'flex-end' : 'flex-start' }]}>
              <Text style={[globalStyle.AbelFont, styles.dayText]}>{getDayName(trip.day, t)}</Text>
              <TouchableOpacity 
  onPress={() => toggleDayDetails(trip._id)}
>
  <Text style={[
    styles.detailsButtonText, 
    expandedDays[trip._id] ? styles.detailsButtonTextActive : styles.detailsButtonTextInactive
  ]}>
    {expandedDays[trip._id] ? t('HideDetails') : t('ShowDetails')}
  </Text>
</TouchableOpacity>
              {expandedDays[trip._id] && (
                <View style={[styles.timeContainer,{
                  flexDirection: isArabic ? 'row-reverse' : 'row',
                }]}>
            <View style={[styles.timeLine,{
              marginTop:10,
              marginLeft:isArabic ? 10 : 0,
              marginRight:isArabic ? 0 : 10
            }]}></View>

                  <View style={styles.timeColumn}>
                    <Text style={[globalStyle.AbelFont, styles.timeLabel]}>{isArabic ? 'وقت الانطلاق' : 'Departure time'}</Text>
                    <Text style={[globalStyle.AbelFont, styles.timeValue]}>{trip?.tripTime}</Text>
                  </View>
                  {trip?.returnTime && (
                    <>
                  <Text style={styles.timeSeparator}>-</Text>
                   <View style={styles.timeColumn}>
                    <Text style={[globalStyle.AbelFont, styles.timeLabel]}>{isArabic ? 'وقت الوصول' : 'Arrival time'}</Text>
                    <Text style={[globalStyle.AbelFont, styles.timeValue]}>{trip?.returnTime}</Text>
                  </View> 
                   
                    </>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </>
  );
};


const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    borderColor: "rgba(238, 238, 238, 1)",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingBottom: 10,
    // paddingHorizontal: 10,
  },
  tripContainer: {
    marginBottom: 10,
  },
  timeLineContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  timeLine: {
    // marginBottom: 10,
    
    width: 3,
    height: 55,
    borderRadius: 5,
    backgroundColor: colors.mainColor,
  },
  timeDetails: {
    flex: 1,
    marginLeft: 10,
  },
  dayText: {
    fontSize: 18,
    // fontWeight: 'bold',
    // marginBottom: 5,
  },
  timeContainer: {
    alignItems: 'center',
    // backgroundColor:"#0f0"
  },
  timeColumn: {
    alignItems: 'center',
    // backgroundColor:"#0ff"
  },
  timeLabel: {
    fontSize: 16,
    color: colors.graybtn,
    marginBottom: 5,
  },
  timeValue: {
    fontSize: 14,
    color: colors.black,
  },
  timeSeparator: {
    fontSize: 18,
    color: colors.graybtn,
    marginHorizontal: 10,
  },
  detailsButton: {
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.mainColor,
  },
  detailsButtonActive: {
    backgroundColor: colors.mainColor,
  },
  detailsButtonText: {
    fontSize: 12,
    // fontWeight: '600',
  },
  detailsButtonTextActive: {
    color: colors.graybtn,
  },
  detailsButtonTextInactive: {
    color: colors.mainColor,
  },
});

export default TripTimes;
