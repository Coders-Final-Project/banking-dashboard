"use client";

import axios from "axios";

import { UploadedFileProps, UploadedProfileProps } from "@/interface";

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
  lastName: string;
  street: string;
  dateOfBirth: string;
  phone: string;
  country: string;
  city: string;
  zipCode: string;
  insuranceCompleted: boolean;
  uploadedFiles: [
    { fileName: string; fileUrl: { public_id: String; secure_url: String } },
  ];
};

interface ContextProps {
  data: DataType;
  updateInsuranceCompleted: (value: boolean) => void;
  updateUploadedFiles: (input: UploadedFileProps) => void;
  updateUserProfile: (input: UploadedProfileProps) => void;
}

const GlobalContext = createContext<ContextProps>({
  data: {
    _id: "",
    firstName: "",
    job: "",
    lastName: "",
    street: "",
    dateOfBirth: "",
    phone: "",
    country: "",
    city: "",
    zipCode: "",
    insuranceCompleted: false,
    uploadedFiles: [
      { fileName: "", fileUrl: { public_id: "", secure_url: "" } },
    ],
  },
  updateInsuranceCompleted: () => {},
  updateUploadedFiles: () => {},
  updateUserProfile: () => {},
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
    lastName: "",
    street: "",
    dateOfBirth: "",
    phone: "",
    country: "",
    city: "",
    zipCode: "",
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

  const updateUserProfile = (input: UploadedProfileProps) => {
    //@ts-ignore
    setData((prevData) => ({
      ...prevData,
      street: input.street,
      dateOfBirth: input.dateOfBirth,
      phone: input.phone,
      country: input.country,
      city: input.city,
      zipCode: input.zipCode,
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
      value={{
        data,
        updateInsuranceCompleted,
        updateUploadedFiles,
        updateUserProfile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
