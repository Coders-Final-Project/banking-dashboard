import Image from "next/image";

import "@/sass/components/_documentItemFile.scss";

interface IProps {
  title: string;
  isSubmitted: boolean;
  color: string;
  handleUpload: (e: any, title: string) => void;
}

const DocumentItemFile = ({
  title,
  isSubmitted,
  color,
  handleUpload,
}: IProps) => {
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
          {isSubmitted ? "Submitted" : "Not submitted"}
        </div>
      </div>
      <button
        onClick={(e) => handleUpload(e, title)}
        className="document__item__file__input"
      >
        <Image
          src="/assets/documents/file.png"
          alt="file"
          width={24}
          height={24}
          className="document__item__file__input__icon"
        />
        <p className="document__item__file__input__text">Upload</p>
      </button>
    </div>
  );
};

export default DocumentItemFile;
