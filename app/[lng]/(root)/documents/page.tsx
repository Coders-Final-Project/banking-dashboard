import Image from "next/image";

import "@/sass/pages/_documents.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import DocumentItem from "@/scenes/DocumentsPage/DocumentItem";
import DocumentAside from "@/scenes/DocumentsPage/DocumentAside";

const Documents = async () => {
  return (
    <main className="documents">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">
            Compliance Documents
          </div>
          <div className="page__header__welcome__desc">
            The documents are based on <span>Azerbaijan </span>
            local laws and your legal structure.
          </div>
        </div>
        <AvatarDetail />
      </header>

      <div className="documents__content">
        <div className="documents__content__warning">
          <Image
            src="/assets/documents/warning.png"
            alt="warning"
            width={24}
            height={24}
            className="documents__content__warning__img"
          />
          <p className="documents__content__warning__text">
            Please upload the missing documents
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
