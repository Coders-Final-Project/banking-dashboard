"use client";

import { ICompanyContracts } from "@/interface";
import axios from "axios";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

type DataType = {
  _id: string;
  firstName: string;
  job: string;
  insuranceCompleted: boolean;
  uploadedFiles: [
    { fileName: string; fileUrl: { public_id: String; secure_url: String } },
  ];
};

interface ContextProps {
  data: DataType;
  updateInsuranceCompleted: (value: boolean) => void;
}

const GlobalContext = createContext<ContextProps>({
  data: {
    _id: "",
    firstName: "",
    job: "",
    insuranceCompleted: false,
    uploadedFiles: [
      { fileName: "", fileUrl: { public_id: "", secure_url: "" } },
    ],
  },
  updateInsuranceCompleted: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<DataType>({
    _id: "",
    firstName: "",
    job: "",
    insuranceCompleted: false,
    uploadedFiles: [
      { fileName: "", fileUrl: { public_id: "", secure_url: "" } },
    ],
  });

  const updateInsuranceCompleted = (value: boolean) => {
    setData((prevData) => ({ ...prevData, insuranceCompleted: value }));
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get("/api/user/me");
        setData(response.data.data);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    getUserInfo();
  }, []);

  return (
    <GlobalContext.Provider value={{ data, updateInsuranceCompleted }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
