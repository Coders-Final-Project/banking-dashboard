"use client";

import Image from "next/image";

import "@/sass/scenes/_documentAside.scss";

import { useTranslation } from "@/i18n/client";

const DocumentAside = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);

  return (
    <div className="documents__aside">
      <Image
        src="/assets/documents/file2.png"
        alt="file"
        width={155}
        height={155}
        className="documents__aside__icon"
      />
      <div className="documents__aside__title">{t("doc.sidebar.title")}</div>
      <div className="documents__aside__desc">{t("doc.sidebar.desc")}</div>
      <button className="documents__aside__btn">
        <p className="documents__aside__btn__text">{t("doc.sidebar.btn")}</p>
        <Image
          src="/assets/documents/arrow.png"
          alt="arrow"
          width={24}
          height={24}
          className="documents__aside__btn__icon"
        />
      </button>
    </div>
  );
};

export default DocumentAside;
