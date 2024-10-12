import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import recyclableReducer from "./recyclableSlice";
import userAddressReducer from "./addressSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch, useSelector } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    recyclables: recyclableReducer,
    address: userAddressReducer,
  },
});

export const persistor = persistStore(store);
export default store;

// Infer types for the app's dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
