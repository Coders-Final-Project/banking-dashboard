"use client";

import { useState } from "react";
import axios from "axios";

import Image from "next/image";

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    setProgress(INITIAL_PROGRESS);
    setMessage(null);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setMessage("No selected file");
      return;
    }

    const fd = new FormData();
    fd.append("fd", selectedFile);

    setMessage("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post("http://httpbin.org/post", fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            //@ts-ignore
            return { ...prevState, pc: progressEvent.progress * 100 };
          });
        },
        headers: {
          "Custom-Header": "Value",
        },
      })
      .then((res) => {
        setMessage("Uploaded successfully");
        console.log(res.data);
      })
      .catch((err) => {
        setMessage("Uploading failed");
        console.log(err);
      });
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
            <input type="file" onChange={handleFileChange} />
            Click here or drag file to upload
          </label>
          {selectedFile && (
            <div className="document__modal__card__content__process">
              <div className="document__modal__card__content__process__file">
                <div className="document__modal__card__content__process__file__text">
                  File Selected
                </div>
                <button
                  onClick={handleUpload}
                  className="document__modal__card__content__process__file__btn"
                >
                  Upload
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
          Supported formats: JPG, PNG, or PDF
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
