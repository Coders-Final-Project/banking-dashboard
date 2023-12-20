"use client";

import Image from "next/image";

import { useGlobalContext } from "@/context/store";

import { uploadImg, deletePhoto } from "@/lib/actions/uploadActions";

import { useRef, ChangeEvent, useState, useEffect } from "react";

import "@/sass/components/_profileInfoPhoto.scss";

import { useSelector } from "react-redux";
import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const ProfileInfoPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const { data, updateProfileImg, deleteProfileImage } = useGlobalContext();
  const url =
    (selectedFile && URL.createObjectURL(selectedFile)) ||
    data.profileImg?.[0]?.fileUrl?.secure_url;

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  useEffect(() => {
    if (success || serverError) {
      setTimeout(() => {
        setSuccess("");
      }, 2000);

      setTimeout(() => {
        setServerError("");
      }, 2000);
    }
  }, [success, serverError]);

  useEffect(() => {
    const uploadFile = async () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("userId", data._id);
        formData.append("fileUrl", selectedFile);

        try {
          const response = await uploadImg(formData);

          if (response.data) {
            updateProfileImg(response.data);
            setSuccess(`Profile image updated!`);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSelectedFile(null);
        }
      }
    };

    uploadFile();
  }, [selectedFile, data._id, updateProfileImg]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const publicId = data.profileImg?.[0]?.fileUrl?.public_id;
      const userID = data._id;

      const response = await deletePhoto({ publicId, userID });

      if (response.status === 202) {
        setSuccess(`${t("settings.alert.success2")}`);
        deleteProfileImage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile__info__photo">
      <div className="profile__info__photo__title">
        {t("settings.photo.title")}
      </div>
      <div className="profile__info__photo__content">
        <Image
          src={url ? url : `/assets/settings/user.png`}
          alt="person"
          width={90}
          height={90}
          className="profile__info__photo__content__person"
        />
        <div className="profile__info__photo__content__btns">
          <button
            className="profile__info__photo__content__btns__upload"
            onClick={handleUploadClick}
          >
            <Image
              src={`/assets/settings/upload.png`}
              alt="person"
              width={24}
              height={24}
              className="profile__info__photo__content__btns__upload__btn"
            />
            {t("settings.photo.btn1")}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              name="profile_img"
            />
          </button>
          <button
            className="profile__info__photo__content__btns__remove"
            onClick={handleDeletePhoto}
          >
            <Image
              src="/assets/settings/remove.png"
              alt="person"
              width={24}
              height={24}
              className="profile__info__photo__content__btns__remove__btn"
            />
            {t("settings.photo.btn2")}
          </button>
        </div>
      </div>
      <div className="profile__info__photo__provider">
        <div className="profile__info__photo__provider__text">
          {t("settings.payrole.text")}
        </div>
        <button className="profile__info__photo__provider__btn">
          {t("settings.payrole.btn")}
        </button>
      </div>
      <div className="profile__info__photo__membership">
        <div className="profile__info__photo__membership__title">
          {t("settings.pricing.text")}
        </div>
        <button className="profile__info__photo__membership__btn">
          {t("settings.pricing.btn")}
          <Image
            src="/assets/settings/price.png"
            alt="person"
            width={24}
            height={24}
            className="profile__info__photo__content__btns__remove__btn"
          />
        </button>
      </div>
      {success !== "" && <div className="image__alert--success">{success}</div>}
      {serverError !== "" && (
        <div className="image__alert--error">{serverError}</div>
      )}
    </div>
  );
};

export default ProfileInfoPhoto;
