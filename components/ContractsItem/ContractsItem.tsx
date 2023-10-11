import Image from "next/image";

import "@/sass/components/_contractsItem.scss";

import { IContractItem } from "@/interface";

const ContractsItem = ({
  companyImg,
  company,
  companyLocation,
  amount,
  clientName,
  startDate,
  endDate,
}: IContractItem) => {
  return (
    <div className="contracts__content__active__body__item">
      <div className="contracts__content__active__body__item__main">
        <Image
          src={companyImg}
          alt={company}
          width={48}
          height={48}
          className="contracts__content__active__body__item__main__img"
        />
        <div className="contracts__content__active__body__item__main__detail">
          <div className="contracts__content__active__body__item__main__detail__name">
            {company}
          </div>
          <div className="contracts__content__active__body__item__main__detail__location">
            {companyLocation}
          </div>
        </div>
        <div className="contracts__content__active__body__item__main__amount">
          <div className="contracts__content__active__body__item__main__amount__number">
            ${amount}
          </div>
          <div className="contracts__content__active__body__item__main__amount__rate">
            Fixed Rate
          </div>
        </div>
      </div>
      <div className="contracts__content__active__body__item__divider" />
      <div className="contracts__content__active__body__item__secondary">
        <div className="contracts__content__active__body__item__secondary__period">
          <div className="contracts__content__active__body__item__secondary__period__title">
            Contract Period
          </div>
          <div className="contracts__content__active__body__item__secondary__period__date">
            {startDate} - {endDate}
          </div>
        </div>
        <div className="contracts__content__active__body__item__secondary__client">
          <div className="contracts__content__active__body__item__secondary__client__title">
            Client Name
          </div>
          <div className="contracts__content__active__body__item__secondary__client__name">
            {clientName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsItem;
