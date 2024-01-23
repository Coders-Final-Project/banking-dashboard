"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import axios from "axios";

import "@/sass/scenes/_homeTransaction.scss";

import { useSelector, useDispatch } from "react-redux";

import TransactionItem from "@/components/TransactionItem/TransactionItem";

import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";
import { useGlobalContext } from "@/context/store";
import { setTransactions } from "@/globalRedux/features/appSlice";

const HomeTransaction = ({ lng }: { lng: string }) => {
  const [serverError, setServerError] = useState("");

  const transactions = useSelector((state: StateProps) => state.transactions);

  const { t } = useTranslation(lng);

  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current === false) {
      const fetchTransactions = async () => {
        try {
          if (data._id) {
            const response = await axios.get(`/api/transactions/${data._id}`);

            dispatch(setTransactions(response.data.transactions));
          }
        } catch (error: any) {
          setServerError(error.response.data.message);
        }
      };

      fetchTransactions();
    }

    return () => {
      effectRef.current = true;
    };
  }, [data._id, dispatch]);

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
        {transactions.length === 0 ? (
          <div className="no__action">There is no action yet!</div>
        ) : (
          transactions.map((action) => (
            <TransactionItem key={action._id} {...action} />
          ))
        )}
      </div>
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
    </div>
  );
};

export default HomeTransaction;
