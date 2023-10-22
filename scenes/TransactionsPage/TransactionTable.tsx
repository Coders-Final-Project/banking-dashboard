"use client";

import { useState } from "react";

import Image from "next/image";

import "@/sass/scenes/_transactionsTable.scss";

import TransactionTableButton from "@/components/TransactionTableButton/TransactionTableButton";
import TransactionsTableItem from "@/components/TransactionsTableItem/TransactionsTableItem";

import { transactionsHistory } from "@/db/transactions";

import { filterActionsTable } from "@/helpers";

const TransactionTable = () => {
  const [actionsData, setActionsData] = useState(transactionsHistory);
  const [check, setCheck] = useState(false);

  const handleSort = (input: string) => {
    setCheck((prevValue) => !prevValue);

    const sortedData =
      filterActionsTable({ input, data: transactionsHistory, check }) || [];
    setActionsData(sortedData);
  };

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
          <button
            className="transactions__table__content__sortBtns__item"
            onClick={() => handleSort("client")}
          >
            Client
            <Image
              src="/assets/transactions/arrows.png"
              alt="arrows"
              width={24}
              height={24}
            />
          </button>
          <div className="transactions__table__content__sortBtns__middleGroup">
            <button
              className="transactions__table__content__sortBtns__element"
              onClick={() => handleSort("payment")}
            >
              Payment
              <Image
                src="/assets/transactions/arrows.png"
                alt="arrows"
                width={24}
                height={24}
              />
            </button>
            <button
              className="transactions__table__content__sortBtns__element"
              onClick={() => handleSort("method")}
            >
              Payment Method
              <Image
                src="/assets/transactions/arrows.png"
                alt="arrows"
                width={24}
                height={24}
              />
            </button>
            <button
              className="transactions__table__content__sortBtns__element"
              onClick={() => handleSort("date")}
            >
              Paid Date
              <Image
                src="/assets/transactions/arrows.png"
                alt="arrows"
                width={24}
                height={24}
              />
            </button>
          </div>

          <button className="transactions__table__content__sortBtns__item">
            Invoice
            <Image
              src="/assets/transactions/arrows.png"
              alt="arrows"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="transactions__table__content__actions">
          {actionsData.map((item) => (
            <TransactionsTableItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
