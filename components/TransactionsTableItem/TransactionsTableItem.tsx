"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import "@/sass/components/_transactionsTableItem.scss";

import { ITransactions } from "@/interface";
import { getFormattedDate } from "@/helpers";

import axios from "axios";

import { useDispatch } from "react-redux";

import { useGlobalContext } from "@/context/store";

import {
  setUserCardInfo,
  increaseNotificationCount,
  updateTransactions,
} from "@/globalRedux/features/appSlice";

import { useSelector } from "react-redux";
import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const TransactionsTableItem = ({
  receiverName,
  receiverJob,
  amount,
  createdAt,
  profileImg,
}: ITransactions) => {
  const { formattedDate, formattedTime } = getFormattedDate(createdAt);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const imgUrl = profileImg?.[0]?.fileUrl?.secure_url;

  const [cardNumber, setCardNumber] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const curLang = useSelector((state: StateProps) => state.curLang);
  const { t } = useTranslation(curLang);

  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  useEffect(() => {
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
    }

    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    }
  }, [errorAlert, successAlert]);

  const handleTransferOpen = () => {
    setIsTransferOpen((prevValue) => !prevValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = String(e.target.value.replace(/\s/g, ""));
    if (formattedValue.length > 0) {
      formattedValue = formattedValue
        .match(new RegExp(".{1,4}", "g"))!
        .join(" ");
    }
    setCardNumber(formattedValue);
  };

  const handleFundTransfer = async () => {
    if (isNaN(parseInt(cardNumber))) {
      setErrorAlert("Provide valid card number!");
      setCardNumber("");
      handleTransferOpen();
      return;
    }

    try {
      if (data?._id && cardNumber.length === 19 && amount !== "") {
        const response = await axios.post("/api/card/transfer", {
          userID: data._id,
          cardNumber,
          amount: fundAmount,
        });

        dispatch(setUserCardInfo(response.data.data[0]));
        dispatch(updateTransactions(response.data.action));
        setSuccessAlert(true);
        dispatch(increaseNotificationCount());
      } else {
        setCardNumber("");
        setFundAmount("");
        setErrorAlert("Unexpected input!");
      }
    } catch (error: any) {
      setErrorAlert(error.response.data.message);
    } finally {
      setCardNumber("");
      setFundAmount("");
      handleTransferOpen();
    }
  };

  return (
    <div className="transactions__table__item">
      <div className="transactions__table__item__person">
        <Image
          src={`${imgUrl ? imgUrl : "/assets/transactions/people.png"}`}
          alt={receiverName}
          width={48}
          height={48}
          className="transactions__table__item__person__img"
        />
        <div className="transactions__table__item__person__detail">
          <div className="transactions__table__item__person__detail__name">
            {receiverName}
          </div>
          <div className="transactions__table__item__person__detail__company">
            {receiverJob}
          </div>
        </div>
      </div>
      <div className="transactions__table__item__payment">
        <div className="transactions__table__item__payment__date">
          {formattedDate}
        </div>
        <div className="transactions__table__item__payment__hour">
          {formattedTime}
        </div>
      </div>
      <div className="transactions__table__item__method">
        <Image
          src="/assets/transactions/paypal.png"
          alt="Paypal"
          width={20}
          height={20}
          className="transactions__table__item__method__img"
        />
        <div className="transactions__table__item__method__text">Paypal</div>
      </div>
      <div className="transactions__table__item__paidDate">
        <div className="transactions__table__item__paidDate__amount">
          -{amount}₼
        </div>
        <div className="transactions__table__item__paidDate__date">
          {formattedDate}
        </div>
      </div>
      <button
        className="transactions__table__item__invoiceBtn"
        onClick={handleTransferOpen}
      >
        <Image
          src="/assets/transactions/invoice.png"
          alt="invoice"
          width={24}
          height={24}
          className="transactions__table__item__invoiceBtn__icon"
        />
        {t("actions.table.itemBtn")}
      </button>
      {isTransferOpen && (
        <div className="action__item__modal">
          <div className="action__item__modal__content">
            <input
              type="text"
              className="action__item__modal__content__input"
              placeholder={`${t("actions.modal.text1")}`}
              value={cardNumber}
              onChange={handleChange}
              minLength={19}
              maxLength={19}
              autoComplete="off"
              name="card_number"
            />
            <input
              type="number"
              className="action__item__modal__content__input"
              placeholder={`${t("actions.modal.text2")}`}
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              autoComplete="off"
              name="amount"
            />
            <button
              className={`action__item__modal__content__btn ${
                parseInt(fundAmount) <= 0 && "disabled"
              }`}
              onClick={handleFundTransfer}
              disabled={parseInt(fundAmount) <= 0}
            >
              {t("actions.modal.btn")}
            </button>
          </div>
          <button
            className="action__item__modal__closeBtn"
            onClick={handleTransferOpen}
          >
            <Image
              src="/assets/transactions/closeModal.png"
              alt="close"
              width={30}
              height={30}
              className="action__item__modal__closeBtn__img"
            />
          </button>
        </div>
      )}
      {errorAlert !== "" && (
        <div className="transactions__table__item__alert--error">
          {errorAlert}
        </div>
      )}
      {successAlert && (
        <div className="transactions__table__item__alert--success">
          {t("actions.alert.success")}
        </div>
      )}
    </div>
  );
};

export default TransactionsTableItem;
