"use client";

import Image from "next/image";

import "@/sass/components/_contractClientItem.scss";

import { IContractClient } from "@/interface";

import { useTranslation } from "@/i18n/client";

const ContractClientItem = ({
  firstName,
  lastName,
  profileImg,
  job,
  lng,
}: IContractClient) => {
  const { t } = useTranslation(lng);

  const imgUrl = profileImg?.[0]?.fileUrl?.secure_url;

  return (
    <div className="contracts__content__client__body__item">
      <Image
        src={`${imgUrl ? imgUrl : "/assets/contracts/people.png"}`}
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
          {t("contract.client.part.link")}
        </p>
      </button>
    </div>
  );
};

export default ContractClientItem;
