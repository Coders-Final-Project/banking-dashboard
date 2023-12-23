"use client";

import Image from "next/image";

import "@/sass/components/_cardInfo.scss";

import { hideCardNumbers } from "@/helpers";
import { useSelector } from "react-redux";
import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const CardInfo = () => {
  const userCard = useSelector((state: StateProps) => state.userCard);

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  return (
    <div className="cards__detail__info">
      <div className="cards__detail__info__heading">
        <div className="cards__detail__info__heading__text">
          {t("cards.info.title")}
        </div>
        <Image
          src="/assets/cards/dot.png"
          alt="dot"
          width={24}
          height={24}
          className="cards__detail__info__heading__icon"
        />
      </div>
      <div className="cards__detail__info__content">
        <div className="cards__detail__info__content__item">
          <div className="cards__detail__info__content__item__text">
            {t("cards.info.number")}
          </div>
          <div className="cards__detail__info__content__item__value">
            {hideCardNumbers(userCard.cardNumber)}{" "}
            {!userCard.cardNumber && "1234"}
          </div>
        </div>
        <div className="cards__detail__info__content__item">
          <div className="cards__detail__info__content__item__text">
            {t("cards.info.balance")}
          </div>
          <div className="cards__detail__info__content__item__value">
            {userCard.balance !== 0 ? userCard.balance : "0,000"} ₼
          </div>
        </div>
        <div className="cards__detail__info__content__item">
          <div className="cards__detail__info__content__item__text">
            {t("cards.info.currency")}
          </div>
          <div className="cards__detail__info__content__item__value">AZN</div>
        </div>
        <div className="cards__detail__info__content__item">
          <div className="cards__detail__info__content__item__text">
            {t("cards.info.status")}
          </div>
          <div className="cards__detail__info__content__item__value">
            {userCard.endDate !== "" ? userCard.endDate : "04/03"}{" "}
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
