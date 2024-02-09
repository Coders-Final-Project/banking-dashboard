"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { StateProps, CardProps } from "@/interface";

const initialState: StateProps = {
  companyContracts: [],
  allCustomers: [],
  transactions: [],
  contractual: [],
  notifications: [],
  invoices: [],
  chatbotMessages: [],
  userCard: {
    _id: -1,
    userName: "",
    userSurname: "",
    securityCode: "",
    cardNumber: "",
    endDate: "",
    balance: 0,
  },
  curLang: "en",
  insuranceCompleted: false,
  notificationCount: 0,
};

export const appSlice: any = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserCardInfo: (state, action: PayloadAction<CardProps>) => {
      state.userCard = action.payload;
    },
    setCurrenctLang: (state, action: PayloadAction<string>) => {
      state.curLang = action.payload;
    },
    setInsuranceCompleted: (state, action: PayloadAction<boolean>) => {
      state.insuranceCompleted = action.payload;
    },
    setChatBotMessages: (
      state,
      action: PayloadAction<{ key: string; value: string }>,
    ) => {
      const { key, value } = action.payload;

      state.chatbotMessages = [...state.chatbotMessages, { key, value }];
    },
    deleteTheLastMessage: (state) => {
      state.chatbotMessages.pop();
    },
    increaseNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    decreaseNotificationsToZero: (state) => {
      state.notificationCount = 0;
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
  setUserCardInfo,
  setCurrenctLang,
  setInsuranceCompleted,
  removeContract,
  increaseNotificationCount,
  decreaseNotificationsToZero,
  setChatBotMessages,
  deleteTheLastMessage,
} = appSlice.actions;

export default appSlice.reducer;
