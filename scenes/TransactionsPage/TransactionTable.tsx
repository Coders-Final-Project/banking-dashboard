import Image from "next/image";

import "@/sass/scenes/_transactionsTable.scss";

import TransactionTableButton from "@/components/TransactionTableButton/TransactionTableButton";
import TransactionsTableItem from "@/components/TransactionsTableItem/TransactionsTableItem";

import { transactionsHistory } from "@/db/transactions";

const TransactionTable = () => {
  return (
    <div className="transactions__table">
      <div className="transactions__table__header">
        <div className="transactions__table__header__title">
          Transaction History
        </div>
        <div className="transactions__table__header__btns">
          <TransactionTableButton img="sort.png" text="Sort & Filter" />
          <TransactionTableButton img="csv.png" text="CSV" />
        </div>
      </div>
      <div className="transactions__table__content">
        <div className="transactions__table__content__sortBtns">
          <div className="transactions__table__content__sortBtns__item">
            Client
            <Image
              src="/assets/transactions/arrows.png"
              alt="arrows"
              width={24}
              height={24}
            />
          </div>
          <div className="transactions__table__content__sortBtns__item">
            Payment
            <Image
              src="/assets/transactions/arrows.png"
              alt="arrows"
              width={24}
              height={24}
            />
          </div>
          <div className="transactions__table__content__sortBtns__item">
            Payment Method
            <Image
              src="/assets/transactions/arrows.png"
              alt="arrows"
              width={24}
              height={24}
            />
          </div>
          <div className="transactions__table__content__sortBtns__item">
            Paid Date
            <Image
              src="/assets/transactions/arrows.png"
              alt="arrows"
              width={24}
              height={24}
            />
          </div>
          <div className="transactions__table__content__sortBtns__item">
            Invoice
            <Image
              src="/assets/transactions/arrows.png"
              alt="arrows"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="transactions__table__content__actions">
          {transactionsHistory.map((item) => (
            <TransactionsTableItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
