import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRecyclable } from "../@types";

type RecyclableState = {
  data: TRecyclable[];
  isInitialzed: boolean;
  selectedId: string | null;
};

const initialState: RecyclableState = {
  isInitialzed: false,
  selectedId: null,
  data: [],
};

const recyclableSlice = createSlice({
  name: "recyclables",
  initialState,
  reducers: {
    initializeRecyclables: (state, action: PayloadAction<TRecyclable[]>) => {
      state.data = action.payload;
      if (action.payload.length > 0) {
        state.isInitialzed = true;
      }
    },
    selectRecyclableItem: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
  },
});

export const { initializeRecyclables, selectRecyclableItem } =
  recyclableSlice.actions;
export default recyclableSlice.reducer;
