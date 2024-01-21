"use client";

import axios from "axios";

import {
  UploadedFileProps,
  UploadedProfileProps,
  UploadedImgProps,
} from "@/interface";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
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
  profileImg: [{ fileUrl: { public_id: string; secure_url: string } }];
};

interface ContextProps {
  data: DataType;
  updateInsuranceCompleted: (value: boolean) => void;
  updateUploadedFiles: (input: UploadedFileProps) => void;
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
    uploadedFiles: [
      { fileName: "", fileUrl: { public_id: "", secure_url: "" } },
    ],
    profileImg: [{ fileUrl: { public_id: "", secure_url: "" } }],
  },
  updateInsuranceCompleted: () => {},
  updateUploadedFiles: () => {},
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
    uploadedFiles: [
      { fileName: "", fileUrl: { public_id: "", secure_url: "" } },
    ],
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

  const deleteProfileImage = () => {
    setData((prevData) => ({
      ...prevData,
      profileImg: [{ fileUrl: { public_id: "", secure_url: "" } }],
    }));
  };

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current === true) {
      const getUserInfo = async () => {
        try {
          const response = await axios.get("api/user/me", {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          });
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
        updateUploadedFiles,
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
