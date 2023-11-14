"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  ICompanyContracts,
  StateProps,
  CardProps,
  CurrenctLangProps,
} from "@/interface";

const initialState: StateProps = {
  companyContracts: [],
  userCard: {
    _id: -1,
    userName: "",
    userSurname: "",
    securityCode: "",
    cardNumber: "",
    endDate: "",
    balance: 0,
  },
  curLang: {
    value: "en",
  },
  insuranceCompleted: false,
};

export const appSlice: any = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCompanyContracts: (
      state,
      action: PayloadAction<[ICompanyContracts]>,
    ) => {
      state.companyContracts = action.payload;
    },
    setUserCardInfo: (state, action: PayloadAction<CardProps>) => {
      state.userCard = action.payload;
    },
    setCurrenctLang: (state, action: PayloadAction<CurrenctLangProps>) => {
      state.curLang = action.payload;
    },
    setInsuranceCompleted: (state, action: PayloadAction<boolean>) => {
      state.insuranceCompleted = true;
    },
  },
});

export const {
  setCompanyContracts,
  setUserCardInfo,
  setCurrenctLang,
  setInsuranceCompleted,
} = appSlice.actions;

export default appSlice.reducer;
