import Link from "next/link";

import "@/sass/scenes/_homeTransaction.scss";

import { userTransactionHistory } from "@/db/user";

import TransactionItem from "@/components/TransactionItem/TransactionItem";

const HomeTransaction = () => {
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
        {userTransactionHistory.map((person) => (
          <TransactionItem key={person.id} {...person} />
        ))}
      </div>
    </div>
  );
};

export default HomeTransaction;
