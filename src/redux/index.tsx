import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import userReducer from "./user";
import locationReducer from "./locationReducer";
import roomsSlice from "./roomsSlice";
import messagesSlice from "./messagesSlice";

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
  rooms: roomsSlice,
  messages: messagesSlice
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "location"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
