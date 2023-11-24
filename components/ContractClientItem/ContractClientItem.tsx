import Image from "next/image";

import "@/sass/components/_contractClientItem.scss";

import { IContractClient } from "@/interface";

const ContractClientItem = ({ firstName, lastName, job }: IContractClient) => {
  return (
    <div className="contracts__content__client__body__item">
      <Image
        src="/assets/contracts/people.png"
        alt="person"
        width={40}
        height={40}
        className="contracts__content__client__body__item__img"
      />

      <div className="contracts__content__client__body__item__detail">
        <div className="contracts__content__client__body__item__detail__client">
          {firstName} {lastName}
        </div>
        <div className="contracts__content__client__body__item__detail__company">
          {job}
        </div>
      </div>
      <button className="contracts__content__client__body__item__btn">
        <Image
          src="/assets/contracts/search.png"
          alt="invoice"
          width={24}
          height={24}
          className="contracts__content__client__body__item__btn__img"
        />
        <p className="contracts__content__client__body__item__btn__text">
          View Profile
        </p>
      </button>
    </div>
  );
};

export default ContractClientItem;
