"use client";

import { Provider } from "react-redux";
import { store } from "./store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import Loading from "@/scenes/Loading/Loading";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistStore(store)}>
        {children}
      </PersistGate>
    </Provider>
  );
}
