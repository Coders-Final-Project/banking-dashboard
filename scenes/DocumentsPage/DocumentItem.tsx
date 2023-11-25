"use client";

import { useState, useEffect } from "react";

import "@/sass/scenes/_documentItem.scss";

import DocumentItemFile from "@/components/DocumentItemFile/DocumentItemFile";
import DocumentModal from "@/components/DocumentModal/DocumentModal";

import { useGlobalContext } from "@/context/store";

const DocumentItem = () => {
  const [modalTitle, setModalTitle] = useState("");
  const [isUploadClicked, setIsUploadClicked] = useState(false);

  const { data } = useGlobalContext();

  const files = data.uploadedFiles.map((file) => {
    return file.fileName;
  });

  const docTitles: string[] = [
    "Passport or National ID",
    "Tax Registration Number",
    "Any additional relevant documents",
    "Proof of registration with the National Social Security Program",
  ];

  const docItemBooleanValues = docTitles.map((doc) => {
    if (files.includes(doc)) {
      return true;
    } else {
      return false;
    }
  });

  const handleUpload = (e: any, title: string) => {
    e.preventDefault();
    setModalTitle(title);
    setIsUploadClicked(true);
  };

  return (
    <div className="documents__content__upload__files">
      <div className="document__item">
        <div className="document__item__title">Required Documents</div>
        <div className="document__item__body">
          <DocumentItemFile
            handleUpload={handleUpload}
            title={docTitles[0]}
            isSubmitted={docItemBooleanValues[0]}
            color="#3A67C1"
          />
          <DocumentItemFile
            handleUpload={handleUpload}
            title={docTitles[1]}
            isSubmitted={docItemBooleanValues[1]}
            color="#0B0B0C"
          />
        </div>
      </div>
      <div className="document__item">
        <div className="document__item__title">Optional Documents</div>
        <div className="document__item__body">
          <DocumentItemFile
            handleUpload={handleUpload}
            title={docTitles[2]}
            isSubmitted={docItemBooleanValues[2]}
            color="#6945FA"
          />
          <DocumentItemFile
            handleUpload={handleUpload}
            title={docTitles[3]}
            isSubmitted={docItemBooleanValues[3]}
            color="#0AAF60"
          />
        </div>
      </div>
      {isUploadClicked && (
        <DocumentModal
          title={modalTitle}
          setIsUploadClicked={setIsUploadClicked}
        />
      )}
    </div>
  );
};

export default DocumentItem;
