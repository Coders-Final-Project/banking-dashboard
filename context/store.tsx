"use client";

import axios from "axios";

import { UploadedFileProps } from "@/interface";

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
  updateUploadedFiles: (input: UploadedFileProps) => void;
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
  updateUploadedFiles: () => {},
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

  const updateUploadedFiles = (input: UploadedFileProps) => {
    //@ts-ignore
    setData((prevData) => ({
      ...prevData,
      uploadedFiles: [...prevData.uploadedFiles, input],
    }));
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
    <GlobalContext.Provider
      value={{ data, updateInsuranceCompleted, updateUploadedFiles }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
