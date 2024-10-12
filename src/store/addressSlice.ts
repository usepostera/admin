import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserAddress } from "../@types";

type UserAddressState = {
  data: TUserAddress[];
  isInitialzed: boolean;
};

const initialState: UserAddressState = {
  isInitialzed: false,
  data: [],
};

const userAddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    initializeUserAddresses: (state, action: PayloadAction<TUserAddress[]>) => {
      state.data = action.payload;
      if (action.payload.length > 0) {
        state.isInitialzed = true;
      }
    },
    insertNewAddress: (state, action: PayloadAction<TUserAddress>) => {
      state.data = [action.payload, ...state.data];
    },
  },
});

export const { initializeUserAddresses, insertNewAddress } =
  userAddressSlice.actions;
export default userAddressSlice.reducer;
