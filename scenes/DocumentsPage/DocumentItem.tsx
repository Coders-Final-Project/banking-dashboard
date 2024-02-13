"use client";

import { useState } from "react";

import "@/sass/scenes/_documentItem.scss";

import DocumentItemFile from "@/components/DocumentItemFile/DocumentItemFile";
import DocumentModal from "@/components/DocumentModal/DocumentModal";

import { useSelector } from "react-redux";
import { StateProps, UploadedFileProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const DocumentItem = ({ allFiles }: { allFiles: UploadedFileProps[] }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [isUploadClicked, setIsUploadClicked] = useState(false);

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  const filesName = allFiles?.map((file: UploadedFileProps) => {
    return file.fileName!;
  });

  const docTitles: string[] = [
    "Passport or National ID",
    "Tax Registration Number",
    "Any additional relevant documents",
    "Proof of registration with the National Social Security Program",
  ];

  const docItemBooleanValues = docTitles.map((doc) => {
    if (filesName?.includes(doc)) {
      return true;
    } else {
      return false;
    }
  });

  const handleUpload = (e: any, docKey: string) => {
    e.preventDefault();
    setModalTitle(docKey);
    setIsUploadClicked(true);
  };

  return (
    <div className="documents__content__upload__files">
      <div className="document__item">
        <div className="document__item__title">{t("doc.box1.title")}</div>
        <div className="document__item__body">
          <DocumentItemFile
            handleUpload={handleUpload}
            title={docTitles[0]}
            docKey="Passport or National ID"
            key="1"
            isSubmitted={docItemBooleanValues[0]}
            color="#3A67C1"
          />
          <DocumentItemFile
            handleUpload={handleUpload}
            title={docTitles[1]}
            docKey="Tax Registration Number"
            key="2"
            isSubmitted={docItemBooleanValues[1]}
            color="#0B0B0C"
          />
        </div>
      </div>
      <div className="document__item">
        <div className="document__item__title">{t("doc.box2.title")}</div>
        <div className="document__item__body">
          <DocumentItemFile
            handleUpload={handleUpload}
            title={docTitles[2]}
            docKey="Any additional relevant documents"
            key="3"
            isSubmitted={docItemBooleanValues[2]}
            color="#6945FA"
          />
          <DocumentItemFile
            handleUpload={handleUpload}
            title={docTitles[3]}
            docKey="Proof of registration with the National Social Security Program"
            key="4"
            isSubmitted={docItemBooleanValues[3]}
            color="#0AAF60"
          />
        </div>
      </div>
      {isUploadClicked && (
        <DocumentModal
          docKey={modalTitle}
          setIsUploadClicked={setIsUploadClicked}
        />
      )}
    </div>
  );
};

export default DocumentItem;
