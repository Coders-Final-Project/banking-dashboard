import Image from "next/image";

import "@/sass/scenes/_documentAside.scss";

const DocumentAside = () => {
  return (
    <div className="documents__aside">
      <Image
        src="/assets/documents/file2.png"
        alt="file"
        width={155}
        height={155}
        className="documents__aside__icon"
      />
      <div className="documents__aside__title">
        Data Processing Agreement (DPA)
      </div>
      <div className="documents__aside__desc">
        You do not have a DPA. Contact the client to create one
      </div>
      <button className="documents__aside__btn">
        <p className="documents__aside__btn__text">Contact Client</p>
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
