

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Car = {
  images: string[];
  carType: string;
  model: string;
};

type Iban = {
  ibanOwner: string;
  ibanNumber: string;
};

type UserData = {
  username: string;
  email: string;
  phone: string;
  lastLogin: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  nationalID: string;
  image: string;
  dateOfBirth: string;
  imageCount: number;
  status: string;
  car: Car;
  iban: Iban;
  maxJobs: number;
  createdAt: string;
  _id: string;
};

type UserState = {
  token: string;
  userData: UserData | {};
  login: boolean;
  netinfo: boolean;
  first: boolean;
  registrationComplete: boolean,
  isFirstLogin: boolean,

};

const initialState: UserState = {
  token: "",
  userData: {},
  login: false,
  netinfo: true,
  first: false,
  registrationComplete: false,
  isFirstLogin: true,

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      state.login = true;
      state.isFirstLogin = state.isFirstLogin;
    },
    UserLogOut: (state) => {
      state.token = "";
      state.login = false;
      state.isFirstLogin = true;
    },

    removeUser: (state) => {
      return { ...initialState, netinfo: state.netinfo };
    },

     setRegistrationComplete: (state, action: PayloadAction<boolean>) => {
      state.registrationComplete = action.payload;
    },

    modifyNetInfo: (state, action: PayloadAction<boolean>) => {
      state.netinfo = action.payload;
    },
    modifyIsFirst: (state, action: PayloadAction<boolean>) => {
      state.first = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, UserLogOut,removeUser, modifyNetInfo,setRegistrationComplete, modifyIsFirst, setToken } = userSlice.actions;
export default userSlice.reducer;
