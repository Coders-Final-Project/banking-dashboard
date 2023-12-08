"use client";

import { useState, useEffect } from "react";

import { uploadFile } from "@/lib/actions/uploadActions";

import Image from "next/image";

import { useSelector } from "react-redux";
import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

import { useGlobalContext } from "@/context/store";

import "@/sass/components/_documentModal.scss";

interface IProps {
  title: string;
  setIsUploadClicked: (input: boolean) => void;
}

const INITIAL_PROGRESS = {
  started: false,
  pc: 0,
};

const DocumentModal = ({ title, setIsUploadClicked }: IProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [message, setMessage] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState(false);

  const { data, updateUploadedFiles } = useGlobalContext();

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    }
  }, [successAlert]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    setProgress(INITIAL_PROGRESS);
    setMessage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("No selected file");
      return;
    }

    const formData = new FormData();
    formData.append("userId", data._id);
    formData.append("fileName", title);
    formData.append("fileUrl", selectedFile);

    setMessage("Uploading...");

    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    try {
      if (data._id) {
        const response = await uploadFile(formData);

        if (response.status === 200) {
          setSuccessAlert(true);
        }

        if (response.data) {
          updateUploadedFiles(response.data);
        }

        setMessage("Uploaded successfully");

        setTimeout(() => {
          setIsUploadClicked(false);
        }, 1000);
      }
    } catch (error) {
      setMessage("Uploading failed");
      console.log(error);
    } finally {
      setSelectedFile(null);
    }
  };

  const handleCloseModal = () => {
    setIsUploadClicked(false);
  };

  return (
    <div className={`document__modal `}>
      <div className="document__modal__card">
        <div className="document__modal__card__heading">
          <div className="document__modal__card__heading__title">{title}</div>
          <button
            onClick={handleCloseModal}
            className="document__modal__card__heading__closeBtn"
          >
            x
          </button>
        </div>
        <div className="document__modal__card__content">
          <Image
            src="/assets/documents/upload-icon.png"
            alt="upload"
            width={56}
            height={56}
            className="document__modal__card__content__icon"
          />
          <label className="document__modal__card__content__input">
            <input type="file" onChange={handleFileChange} accept=".pdf" />
            {t("doc.modal.text")}
          </label>
          {selectedFile && (
            <div className="document__modal__card__content__process">
              <div className="document__modal__card__content__process__file">
                <div className="document__modal__card__content__process__file__text">
                  {t("doc.modal.case")}
                </div>
                <button
                  onClick={handleUpload}
                  className="document__modal__card__content__process__file__btn"
                >
                  {t("doc.modal.btn")}
                </button>
              </div>
              {progress.started && (
                <div className="document__modal__card__content__process__progress">
                  <progress max="100" value={progress.pc}></progress>
                  {message && <span>{message}</span>}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="document__modal__card__note">
          {t("doc.modal.note")} JPG, PNG, or PDF
        </div>
      </div>
      {successAlert && (
        <div className="documents__alert--success">
          {t("doc.modal.success")}
        </div>
      )}
    </div>
  );
};

export default DocumentModal;
