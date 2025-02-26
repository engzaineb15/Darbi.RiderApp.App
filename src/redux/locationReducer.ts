// locationReducer.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LocationState = {
  departure: {
    latitude: number | null;
    longitude: number | null;
    placeName: string;
  };
  arrival: {
    latitude: number | null;
    longitude: number | null;
    placeName: string;
  };
  RidercurrentLocation: {
    latitude: number | null;
    longitude: number | null;
  };
};

const initialState: LocationState = {
  departure: {
    latitude: null,
    longitude: null,
    placeName: '',
  },
  arrival: {
    latitude: null,
    longitude: null,
    placeName: '',
  },
  RidercurrentLocation: {
    latitude: null,
    longitude: null,
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setDepartureLocation: (state, action: PayloadAction<{ latitude: number, longitude: number, placeName: string }>) => {
      state.departure = action.payload;
    },
    setArrivalLocation: (state, action: PayloadAction<{ latitude: number, longitude: number, placeName: string }>) => {
      state.arrival = action.payload;
    },
    setRidercurrentLocation: (state, action: PayloadAction<{ latitude: number | null, longitude: number | null }>) => {
      state.RidercurrentLocation = action.payload;
      state.RidercurrentLocation = action.payload;
    },
  },
});

export const { setDepartureLocation, setArrivalLocation ,setRidercurrentLocation} = locationSlice.actions;
export default locationSlice.reducer;
