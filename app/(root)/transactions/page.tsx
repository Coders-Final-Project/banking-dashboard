import "@/sass/pages/_transactions.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

import TransactionsUp from "@/scenes/TransactionsPage/TransactionsUp";
import TransactionsDetail from "@/scenes/TransactionsPage/TransactionsDetail";
import TransactionTable from "@/scenes/TransactionsPage/TransactionTable";

const Transactions = () => {
  return (
    <main className="transactions">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Transactions</div>
        </div>
        <AvatarDetail />
      </header>
      <div className="transactions__content">
        <div className="transactions__content__boxes">
          <TransactionsUp />
          <TransactionsDetail />
        </div>
        <TransactionTable />
      </div>
    </main>
  );
};

export default Transactions;
