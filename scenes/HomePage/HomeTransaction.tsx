"use client";

import Link from "next/link";

import { useEffect } from "react";

import "@/sass/scenes/_homeTransaction.scss";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { setTransactions } from "@/globalRedux/features/appSlice";

import TransactionItem from "@/components/TransactionItem/TransactionItem";

import { useGlobalContext } from "@/context/store";

import { StateProps } from "@/interface";

const HomeTransaction = () => {
  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const { transactions } = useSelector((state: StateProps) => state);

  useEffect(() => {
    const fetchCompanyContracts = async () => {
      try {
        if (data._id) {
          const response = await axios.post("/api/transactions", {
            userID: data._id,
          });

          dispatch(setTransactions(response.data.transactions));
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCompanyContracts();
  }, [data, dispatch]);

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
