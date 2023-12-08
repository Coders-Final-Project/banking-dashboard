"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { useGlobalContext } from "@/context/store";

import "@/sass/components/_cardTransferItem.scss";
import {
  increaseNotificationCount,
  setUserCardInfo,
} from "@/globalRedux/features/appSlice";
import { StateProps } from "@/interface";

interface IProps {
  imgUrlEnd: string;
  text: string;
}

import { useTranslation } from "@/i18n/client";

const CardTransferItem = ({ imgUrlEnd, text }: IProps) => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  const userCard = useSelector((state: StateProps) => state.userCard);

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  useEffect(() => {
    if (errorAlert) {
      setTimeout(() => {
        setErrorAlert(false);
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
    try {
      if (data?._id && cardNumber.length === 19 && amount !== "") {
        const response = await axios.post("/api/card/transfer", {
          userID: data._id,
          cardNumber,
          amount,
        });

        dispatch(setUserCardInfo(response.data.data[0]));
        setSuccessAlert(true);
        dispatch(increaseNotificationCount());
      } else {
        setCardNumber("");
        setAmount("");
        setErrorAlert(true);
      }
    } catch (error) {
      console.log(error);
      setErrorAlert(true);
    } finally {
      setCardNumber("");
      setAmount("");
    }
  };

  return (
    <div className="transfer__content">
      <button
        className="transfer__content__header"
        onClick={handleTransferOpen}
      >
        <Image
          src={`/assets/cards/${imgUrlEnd}`}
          alt={text}
          width={30}
          height={30}
          className="transfer__content__header__img"
        />
        <div className="transfer__content__header__text">{text}</div>
        <Image
          src={`/assets/cards/${isTransferOpen ? "down" : "right"}-arrow.png`}
          alt="arrow"
          width={24}
          height={24}
          className="cards__detail__transfer__content__header__icon"
        />
      </button>
      {isTransferOpen && (
        <div className="transfer__content__body">
          <input
            type="string"
            className="transfer__content__body__input"
            placeholder={`${t("cards.transfer.input1")}`}
            value={cardNumber}
            onChange={handleChange}
            minLength={19}
            maxLength={19}
          />
          <input
            type="number"
            className="transfer__content__body__input"
            placeholder={`${t("cards.transfer.input2")}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className={`transfer__content__body__sendBtn ${
              (userCard._id === -1 ||
                Number(userCard.balance) < Number(amount)) &&
              "disabled__btn"
            }`}
            onClick={handleFundTransfer}
            disabled={userCard._id === -1}
          >
            {t("cards.transfer.btn")}
          </button>
        </div>
      )}
      {errorAlert && (
        <div className="transfer__content__alert--error">
          {t("cards.alert.error")}
        </div>
      )}
      {successAlert && (
        <div className="transfer__content__alert--success">
          {t("cards.alert.success")}
        </div>
      )}
    </div>
  );
};

export default CardTransferItem;
