"use client";

import Image from "next/image";

import "@/sass/scenes/_transactionsDetail.scss";

import TransactionsPerson from "@/components/TransactionsPerson/TransactionsPerson";

import { useSelector } from "react-redux";

import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const TransactionsDetail = () => {
  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  return (
    <div className="transactions__detail">
      <div className="transactions__detail__forMonth">
        <Image
          src="/assets/transactions/up.png"
          alt="calendar"
          width={32}
          height={32}
          className="transactions__detail__forMonth__icon"
        />
        <div className="transactions__detail__forMonth__content">
          <div className="transactions__detail__forMonth__content__title">
            {t("actions.line2.title")}
          </div>
          <div className="transactions__detail__forMonth__content__result">
            <div className="transactions__detail__forMonth__content__result__number">
              100₼
            </div>
            <div className="transactions__detail__forMonth__content__result__pers">
              +8%
            </div>
            <Image
              src="/assets/transactions/graph.png"
              alt="graph"
              width={90}
              height={45}
              className="transactions__detail__forMonth__content__result__graph"
            />
          </div>
          <div className="transactions__detail__forMonth__content__persons">
            <div className="transactions__detail__forMonth__content__persons__list">
              {[1, 2, 3, 4, 5].map((order) => (
                <TransactionsPerson key={order} order={order} />
              ))}
            </div>
            <button className="transactions__detail__forMonth__content__persons__btn">
              {t("actions.line2.btn")}
            </button>
          </div>
        </div>
      </div>
      <div className="transactions__detail__divider" />
      <div className="transactions__detail__balance">
        <Image
          src="/assets/transactions/balance.png"
          alt="balance"
          width={32}
          height={32}
          className="transactions__detail__balance__icon"
        />
        <div className="transactions__detail__balance__content">
          <div className="transactions__detail__balance__content__title">
            {t("actions.line3.title")}
          </div>
          <div className="transactions__detail__balance__content__number">
            2,325₼
          </div>
          <div className="transactions__detail__balance__content__annual">
            <div className="transactions__detail__balance__content__annual__title">
              {t("actions.line4.text")}
            </div>
            <Image
              src="/assets/transactions/increase.png"
              alt="increase"
              width={30}
              height={30}
              className="transactions__detail__balance__content__annual__icon"
            />
            <div className="transactions__detail__balance__content__annual__number">
              800₼
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsDetail;
