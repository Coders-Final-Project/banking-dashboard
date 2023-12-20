"use client";

import Image from "next/image";

import { useSelector } from "react-redux";
import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

import "@/sass/components/_documentItemFile.scss";

interface IProps {
  title: string;
  docKey:string;
  isSubmitted: boolean;
  color: string;
  handleUpload: (e: any, title: string) => void;
}

const DocumentItemFile = ({
  title,
  isSubmitted,
  docKey,
  color,
  handleUpload,
}: IProps) => {
  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  return (
    <div className="document__item__file">
      <div
        className="document__item__file__icons"
        style={{ backgroundColor: `${color}` }}
      >
        <Image
          src="/assets/documents/upload.png"
          alt="upload"
          width={22}
          height={25}
          className="document__item__file__icons__img"
        />
      </div>
      <div className="document__item__file__text">
        <div className="document__item__file__text__title">{title}</div>
        <div className="document__item__file__text__case">
          {isSubmitted ? `${t("doc.box.case1")}` : `${t("doc.box.case2")}`}
        </div>
      </div>
      <button
        onClick={(e) => handleUpload(e, docKey)}
        className="document__item__file__input"
      >
        <Image
          src="/assets/documents/file.png"
          alt="file"
          width={24}
          height={24}
          className="document__item__file__input__icon"
        />
        <p className="document__item__file__input__text">{t("doc.box.btn")}</p>
      </button>
    </div>
  );
};

export default DocumentItemFile;
