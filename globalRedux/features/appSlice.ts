"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ICompanyContracts, StateProps } from "@/interface";

const initialState: StateProps = {
  companyContracts: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCompanyContracts: (
      state,
      action: PayloadAction<[ICompanyContracts]>,
    ) => {
      state.companyContracts = action.payload;
    },
  },
});

export const { setCompanyContracts } = appSlice.actions;

export default appSlice.reducer;
