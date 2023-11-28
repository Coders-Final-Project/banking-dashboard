"use client";

import Link from "next/link";

import "@/sass/scenes/_homeTransaction.scss";

import { useSelector } from "react-redux";

import TransactionItem from "@/components/TransactionItem/TransactionItem";

import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const HomeTransaction = ({ lng }: { lng: string }) => {
  const transactions = useSelector((state: StateProps) => state.transactions);

  const { t } = useTranslation(lng);

  return (
    <div className="home__content__transaction">
      <div className="home__content__transaction__header">
        <div className="home__content__transaction__header__title">
          {t("home.actions.title")}
        </div>
        <Link
          href="/transactions"
          className="home__content__transaction__header__all"
        >
          {t("home.actions.link")}
        </Link>
      </div>
      <div className="home__content__transaction__body">
        {transactions.map((action) => (
          <TransactionItem key={action._id} {...action} />
        ))}

        {transactions.length === 0 && (
          <div className="no__action">There is no action yet!</div>
        )}
      </div>
    </div>
  );
};

export default HomeTransaction;
