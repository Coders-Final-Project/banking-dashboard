"use client";

import Link from "next/link";

import "@/sass/scenes/_homeTransaction.scss";

import { useSelector } from "react-redux";

import TransactionItem from "@/components/TransactionItem/TransactionItem";

import { StateProps } from "@/interface";

const HomeTransaction = () => {
  const transactions = useSelector((state: StateProps) => state.transactions);

  return (
    <div className="home__content__transaction">
      <div className="home__content__transaction__header">
        <div className="home__content__transaction__header__title">
          Transaction History
        </div>
        <Link
          href="/transactions"
          className="home__content__transaction__header__all"
        >
          see all
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
