"use client";

import { useState } from "react";

import "@/sass/scenes/_documentItem.scss";

import DocumentItemFile from "@/components/DocumentItemFile/DocumentItemFile";
import DocumentModal from "@/components/DocumentModal/DocumentModal";

const DocumentItem = () => {
  const [modalTitle, setModalTitle] = useState("");
  const [isUploadClicked, setIsUploadClicked] = useState(false);

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
            title="Passport or National ID"
            isSubmitted={false}
            color="#3A67C1"
          />
          <DocumentItemFile
            handleUpload={handleUpload}
            title="Tax Registration Number"
            isSubmitted={false}
            color="#0B0B0C"
          />
        </div>
      </div>
      <div className="document__item">
        <div className="document__item__title">Optional Documents</div>
        <div className="document__item__body">
          <DocumentItemFile
            handleUpload={handleUpload}
            title="Any additional relevant documents"
            isSubmitted={false}
            color="#6945FA"
          />
          <DocumentItemFile
            handleUpload={handleUpload}
            title="Proof of registration with the National Social Security Program"
            isSubmitted={false}
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
