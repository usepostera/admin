import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMetric } from "../@types";

type DashboardState = {
  data: TMetric[];
  isInitialzed: boolean;
};

const initialState: DashboardState = {
  isInitialzed: false,
  data: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    initializeDashboardMetrics: (state, action: PayloadAction<TMetric[]>) => {
      state.data = action.payload;
      if (action.payload.length > 0) {
        state.isInitialzed = true;
      }
    },
  },
});

export const { initializeDashboardMetrics } = dashboardSlice.actions;
export default dashboardSlice.reducer;
