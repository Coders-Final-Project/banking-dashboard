"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import axios from "axios";

import "@/sass/scenes/_homeTransaction.scss";

import TransactionItem from "@/components/TransactionItem/TransactionItem";

import { ITransactions } from "@/interface";

import { useTranslation } from "@/i18n/client";
import { useGlobalContext } from "@/context/store";

import useSWR from "swr";

const HomeTransaction = ({ lng }: { lng: string }) => {
  const [serverError, setServerError] = useState("");

  const { t } = useTranslation(lng);

  const { data } = useGlobalContext();

  useEffect(() => {
    if (serverError !== "") {
      setTimeout(() => {
        setServerError("");
      }, 1500);
    }
  }, [serverError]);

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error: any) {
      setServerError(error?.message);
    }
  };

  const {
    data: transactions,
    mutate,
    isLoading,
  } = useSWR(`/api/transactions/${data._id}`, fetcher);

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
        {isLoading && <div className="no__action">Loading...</div>}

        {transactions?.data?.transactions?.length === 0 ? (
          <div className="no__action">There is no action yet!</div>
        ) : (
          transactions?.data?.transactions?.map((action: ITransactions) => (
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
