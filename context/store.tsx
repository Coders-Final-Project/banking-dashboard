"use client";

import axios from "axios";

import { UploadedProfileProps, UploadedImgProps } from "@/interface";

import { createContext, useContext, useState, useEffect, useRef } from "react";

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
  profileImg: [{ fileUrl: { public_id: string; secure_url: string } }];
};

interface ContextProps {
  data: DataType;
  updateInsuranceCompleted: (value: boolean) => void;
  updateUserProfile: (input: UploadedProfileProps) => void;
  updateProfileImg: (input: UploadedImgProps) => void;
  deleteProfileImage: () => void;
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
    profileImg: [{ fileUrl: { public_id: "", secure_url: "" } }],
  },
  updateInsuranceCompleted: () => {},
  updateUserProfile: () => {},
  updateProfileImg: () => {},
  deleteProfileImage: () => {},
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
    profileImg: [{ fileUrl: { public_id: "", secure_url: "" } }],
  });

  const updateInsuranceCompleted = (value: boolean) => {
    setData((prevData) => ({ ...prevData, insuranceCompleted: value }));
  };

  const updateProfileImg = (input: UploadedImgProps) => {
    //@ts-ignore
    setData((prevData) => ({
      ...prevData,
      profileImg: [input],
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

  const deleteProfileImage = () => {
    setData((prevData) => ({
      ...prevData,
      profileImg: [{ fileUrl: { public_id: "", secure_url: "" } }],
    }));
  };

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current === false) {
      const getUserInfo = async () => {
        try {
          const response = await axios.get("/api/user/me");
          setData(response.data.data);
        } catch (error: any) {
          throw new Error(error.message);
        }
      };

      getUserInfo();
    }

    return () => {
      effectRef.current = true;
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        data,
        updateInsuranceCompleted,
        updateUserProfile,
        updateProfileImg,
        deleteProfileImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
