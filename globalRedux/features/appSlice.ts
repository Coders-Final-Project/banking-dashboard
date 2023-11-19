"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  ICompanyContracts,
  StateProps,
  CardProps,
  CurrenctLangProps,
  IAllCustomers,
} from "@/interface";

const initialState: StateProps = {
  companyContracts: [],
  allCustomers: [],
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
    setAllCustomers: (state, action: PayloadAction<IAllCustomers[]>) => {
      state.allCustomers = action.payload;
    },
    setUserCardInfo: (state, action: PayloadAction<CardProps>) => {
      state.userCard = action.payload;
    },
    setCurrenctLang: (state, action: PayloadAction<CurrenctLangProps>) => {
      state.curLang = action.payload;
    },
    setInsuranceCompleted: (state, action: PayloadAction<boolean>) => {
      state.insuranceCompleted = action.payload;
    },
    removeContract: (state, action) => {
      const contractIdToRemove = action.payload;
      state.companyContracts = state.companyContracts.filter(
        (contract) => contract._id !== contractIdToRemove,
      );
    },
  },
});

export const {
  setCompanyContracts,
  setUserCardInfo,
  setCurrenctLang,
  setInsuranceCompleted,
  removeContract,
  setAllCustomers,
} = appSlice.actions;

export default appSlice.reducer;
