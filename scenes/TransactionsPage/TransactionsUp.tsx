"use client";

import Image from "next/image";

import "@/sass/scenes/_transactionsUp.scss";

import { useTranslation } from "@/i18n/client";

const TransactionsUp = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);

  return (
    <div className="transactions__upcoming">
      <Image
        src="/assets/transactions/up.png"
        alt="up"
        width={32}
        height={32}
        className="transactions__upcoming__icon"
      />
      <div className="transactions__upcoming__data">
        <div className="transactions__upcoming__data__title">
          {t("actions.line1.title")}
        </div>
        <div className="transactions__upcoming__data__date">
          April 12th, <span>2024</span>
        </div>
        <button className="transactions__upcoming__data__btn">
          {t("actions.line1.btn")}
        </button>
      </div>
    </div>
  );
};

export default TransactionsUp;
