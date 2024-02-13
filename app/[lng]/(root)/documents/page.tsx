"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { useGlobalContext } from "@/context/store";

import "@/sass/pages/_documents.scss";
import "@/sass/layout/_pageHeader.scss";

import axios from "axios";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import DocumentItem from "@/scenes/DocumentsPage/DocumentItem";
import DocumentAside from "@/scenes/DocumentsPage/DocumentAside";

import { useDispatch } from "react-redux";
import { setCurrenctLang } from "@/globalRedux/features/appSlice";

import { useTranslation } from "@/i18n/client";

import useSWR from "swr";

const Documents = ({ params: { lng } }: { params: { lng: string } }) => {
  const { data } = useGlobalContext();
  const [serverError, setServerError] = useState("");

  const { t } = useTranslation(lng);

  const dispatch = useDispatch();

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response?.data?.documents?.uploadedFiles;
    } catch (error: any) {
      setServerError(error?.message);
    }
  };

  const {
    data: files,
    mutate,
    isLoading,
  } = useSWR(`/api/documents/${data._id}`, fetcher);

  useEffect(() => {
    dispatch(setCurrenctLang(lng));
  }, [lng, dispatch]);

  const filesProvided = Number(files?.length) === 4;

  console.log(files);

  return (
    <main className="documents">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">
            {t("doc.main.title")}
          </div>
          <div className="page__header__welcome__desc">
            {t("doc.main.desc")}
          </div>
        </div>
        <AvatarDetail />
      </header>

      <div className="documents__content">
        <div
          className={`documents__content__warning ${
            filesProvided && "success"
          }`}
        >
          <Image
            src={`/assets/documents/${
              filesProvided ? "all-uploaded" : "warning"
            }.png`}
            alt="warning"
            width={24}
            height={24}
            className="documents__content__warning__img"
          />
          <p className="documents__content__warning__text">
            {filesProvided ? `${t("doc.warning2")}` : `${t("doc.warning1")}`}
          </p>
        </div>
        <div className="documents__content__upload">
          {isLoading ? (
            <div className="documents__content__loading">Loading... </div>
          ) : (
            <DocumentItem allFiles={files} />
          )}
          <DocumentAside />
        </div>
      </div>
      {serverError !== "" && (
        <div className="documents__alert--error">{serverError}</div>
      )}
    </main>
  );
};

export default Documents;
