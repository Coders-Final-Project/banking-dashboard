import Image from "next/image";

import "@/sass/components/_contractsItem.scss";

import { defineCompanyImage } from "@/helpers";

import { ICompanyContracts } from "@/interface";

const ContractsItem = ({ client, company, rate, date }: ICompanyContracts) => {
  return (
    <div className="contracts__content__active__body__item">
      <div className="contracts__content__active__body__item__main">
        <Image
          src={`/assets/contracts/${defineCompanyImage(company)}`}
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
            Azerbaijan
          </div>
        </div>
        <div className="contracts__content__active__body__item__main__amount">
          <div className="contracts__content__active__body__item__main__amount__number">
            {rate} ₼
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
            {/* {startDate} - {endDate} */}
            {date}
          </div>
        </div>
        <div className="contracts__content__active__body__item__secondary__client">
          <div className="contracts__content__active__body__item__secondary__client__title">
            Client Name
          </div>
          <div className="contracts__content__active__body__item__secondary__client__name">
            {client}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsItem;
