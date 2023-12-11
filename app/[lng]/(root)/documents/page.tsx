"use client";

import Image from "next/image";

import { useEffect } from "react";

import { useGlobalContext } from "@/context/store";

import "@/sass/pages/_documents.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import DocumentItem from "@/scenes/DocumentsPage/DocumentItem";
import DocumentAside from "@/scenes/DocumentsPage/DocumentAside";

import { useDispatch } from "react-redux";
import { setCurrenctLang } from "@/globalRedux/features/appSlice";

import { useTranslation } from "@/i18n/client";

const Documents = ({ params: { lng } }: { params: { lng: string } }) => {
  const { data } = useGlobalContext();

  const { t } = useTranslation(lng);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrenctLang(lng));
  }, [lng, dispatch]);

  const allFilesProvided = Number(data.uploadedFiles.length) === 4;

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
            allFilesProvided && "success"
          }`}
        >
          <Image
            src={`/assets/documents/${
              allFilesProvided ? "all-uploaded" : "warning"
            }.png`}
            alt="warning"
            width={24}
            height={24}
            className="documents__content__warning__img"
          />
          <p className="documents__content__warning__text">
            {allFilesProvided ? `${t("doc.warning2")}` : `${t("doc.warning1")}`}
          </p>
        </div>
        <div className="documents__content__upload">
          <DocumentItem />
          <DocumentAside />
        </div>
      </div>
    </main>
  );
};

export default Documents;
