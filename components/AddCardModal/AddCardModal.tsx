"use client";

import { useState, useEffect } from "react";

import "@/sass/components/_addCardModal.scss";

import { useSelector, useDispatch } from "react-redux";

import { setUserCardInfo } from "@/globalRedux/features/appSlice";

import { ICardFormVaues, StateProps } from "@/interface";
import axios from "axios";
import { useGlobalContext } from "@/context/store";

interface IProps {
  handleCardModal: () => void;
  setShowALert: (input: boolean) => void;
}

const INITIAL_VALUES = {
  cardNumber: "",
  endDate: "",
  securityCode: "",
};

import { useTranslation } from "@/i18n/client";

const AddCardModal = ({ handleCardModal, setShowALert }: IProps) => {
  const [cardValues, setCardValues] = useState<ICardFormVaues>(INITIAL_VALUES);
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
    }
  }, [errorAlert]);

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { cardNumber, endDate, securityCode } = cardValues;

    function isNumberInQuotes(s: string) {
      s = removeSpacesAndSlash(s);

      return !isNaN(+s);
    }

    function removeSpacesAndSlash(s: string) {
      return s.replace(/\s+|\/+/g, "");
    }

    if (
      !isNumberInQuotes(cardNumber) ||
      !isNumberInQuotes(endDate) ||
      !isNumberInQuotes(securityCode)
    ) {
      setErrorAlert("Provide correct values!");
      setCardValues(INITIAL_VALUES);
      return;
    }

    try {
      if (data._id) {
        const response = await axios.post("/api/card/create", {
          cardValues,
          userID: data._id,
        });

        dispatch(setUserCardInfo(response.data.savedCard));
      }

      setShowALert(true);

      setTimeout(() => {
        setShowALert(false);
      }, 2000);

      handleCardModal();
    } catch (error: any) {
      setErrorAlert(error.response.data.message);
    }
  };

  const handleChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    if (target.name === "cardNumber") {
      if (
        target.value.length === 4 ||
        target.value.length === 9 ||
        target.value.length === 14
      ) {
        target.value += " ";
      }
    }

    if (target.name === "endDate") {
      if (target.value.length === 2) {
        target.value += "/";
      }
    }

    if (target.name === "securityCode") {
      if (target.value.length > 3) {
        return;
      }
    }

    setCardValues((prevValues) => ({
      ...prevValues,
      [target.name]: target.value,
    }));
  };

  return (
    <form
      className="add__card__modal"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="cards__detail__addModal">
        <div className="cards__detail__addModal__item">
          <label htmlFor="cardNumber">{t("card.modal.title1")}</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 1234"
            name="cardNumber"
            value={cardValues.cardNumber}
            required
            onChange={handleChange}
            minLength={19}
            maxLength={19}
          />
        </div>
        <div className="cards__detail__addModal__item">
          <label htmlFor="date">{t("card.modal.title2")}</label>
          <input
            type="text"
            id="date"
            placeholder="10/23"
            name="endDate"
            value={cardValues.endDate}
            required
            onChange={handleChange}
            minLength={5}
            maxLength={5}
          />
        </div>
        <div className="cards__detail__addModal__item">
          <label htmlFor="security">{t("card.modal.title3")}</label>
          <input
            type="number"
            id="security"
            placeholder="000"
            name="securityCode"
            value={cardValues.securityCode}
            required
            onChange={handleChange}
          />
        </div>
        <button className="cards__detail__addModal__btn" type="submit">
          {t("card.modal.btn")}
        </button>
      </div>
      <button
        className="add__card__modal__closeBtn"
        type="button"
        onClick={handleCardModal}
      >
        x
      </button>
      {errorAlert !== "" && (
        <div className="card__modal__alert--error">{errorAlert}</div>
      )}
    </form>
  );
};

export default AddCardModal;
