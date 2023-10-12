import "@/sass/scenes/_documentItem.scss";

import DocumentItemFile from "@/components/DocumentItemFile/DocumentItemFile";

const DocumentItem = () => {
  return (
    <div className="documents__content__upload__files">
      <div className="document__item">
        <div className="document__item__title">Required Documents</div>
        <div className="document__item__body">
          <DocumentItemFile
            title="Passport or National ID"
            isSubmitted={false}
            color="#3A67C1"
          />
          <DocumentItemFile
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
            title="Any additional relevant documents"
            isSubmitted={false}
            color="#6945FA"
          />
          <DocumentItemFile
            title="Proof of registration with the National Social Security Program"
            isSubmitted={false}
            color="#0AAF60"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentItem;
