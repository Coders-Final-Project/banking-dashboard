"use client";

import Image from "next/image";

import "@/sass/scenes/_cardsSummary.scss";

import img from "../../public/assets/cards/income-icon.png";

import { useTranslation } from "@/i18n/client";

const CardsSummary = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);

  return (
    <div className="cards__summary">
      <div className="cards__summary__item">
        <Image
          src={img}
          alt="income"
          width={30}
          height={30}
          className="cards__summary__item__icon"
        />
        <div className="cards__summary__item__info">
          <div className="cards__summary__item__info__title">
            {t("cards.line1.title1")}
          </div>
          <div className="cards__summary__item__info__total">
            $8,127<span>.90</span>
          </div>
          <div className="cards__summary__item__info__change">
            <span className="income">+24%</span> {t("cards.line1.compare")}
          </div>
        </div>
        <Image
          src="/assets/cards/income-graph.png"
          alt="income"
          width={90}
          height={45}
          className="cards__summary__item__graph"
        />
      </div>
      <div className="cards__summary__divider" />
      <div className="cards__summary__item">
        <Image
          src="/assets/cards/expense-icon.png"
          alt="expense"
          width={30}
          height={30}
          className="cards__summary__item__icon"
        />
        <div className="cards__summary__item__info">
          <div className="cards__summary__item__info__title">
            {t("cards.line1.title2")}
          </div>
          <div className="cards__summary__item__info__total">
            $1,325<span>.90</span>
          </div>
          <div className="cards__summary__item__info__change">
            <span className="expense">-2%</span> {t("cards.line1.compare")}
          </div>
        </div>
        <Image
          src="/assets/cards/expense-graph.png"
          alt="expense"
          width={90}
          height={45}
          className="cards__summary__item__graph"
        />
      </div>
    </div>
  );
};

export default CardsSummary;
