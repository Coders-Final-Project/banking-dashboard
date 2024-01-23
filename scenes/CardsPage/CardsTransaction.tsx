"use client";

import { useState, useEffect, useRef } from "react";

import Image from "next/image";

import axios from "axios";

import "@/sass/scenes/_cardsTransaction.scss";

import CardActionItem from "@/components/CardActionItem/CardActionItem";

import { filterCardsTable } from "@/helpers";

import { useSelector, useDispatch } from "react-redux";

import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";
import { useGlobalContext } from "@/context/store";
import { setContractual } from "@/globalRedux/features/appSlice";

const CardsTransaction = () => {
  const [check, setCheck] = useState(false);
  const [serverError, setServerError] = useState("");

  const contractual = useSelector((state: StateProps) => state.contractual);

  const [cardData, setCardData] = useState(contractual);

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current === false) {
      const fetchContractuals = async () => {
        try {
          if (data._id) {
            const response = await axios.get(`/api/contractuals/${data._id}`);
            dispatch(setContractual(response.data.contractuals));
          }
        } catch (error: any) {
          setServerError(error.response.data.message);
        }
      };

      fetchContractuals();
    }

    return () => {
      effectRef.current = true;
    };
  }, [data._id, dispatch]);

  useEffect(() => {
    setCardData(contractual);
  }, [contractual]);

  const handleSort = (input: string) => {
    setCheck((prevValue) => !prevValue);

    if (input === "name" || input === "date" || input === "amount") {
      const sortedData =
        filterCardsTable({ input, data: contractual, check }) || [];
      setCardData(sortedData);
    }
  };

  return (
    <div className="cards__transaction">
      <div className="cards__transaction__heading">
        <div className="cards__transaction__heading__title">
          {t("card.table.title")}
        </div>
      </div>
      <div className="cards__transaction__content">
        <div className="cards__transaction__content__header">
          <button
            className="cards__transaction__content__header__filterBtn"
            onClick={() => handleSort("name")}
          >
            {t("card.table.filter1")}
            <Image
              src="/assets/cards/arrows.png"
              alt="arrows"
              width={24}
              height={24}
              className="cards__transaction__content__header__filterBtn__icon"
            />
          </button>
          <button
            className="cards__transaction__content__header__filterBtn"
            onClick={() => handleSort("date")}
          >
            {t("card.table.filter2")}
            <Image
              src="/assets/cards/arrows.png"
              alt="arrows"
              width={24}
              height={24}
              className="cards__transaction__content__header__filterBtn__icon"
            />
          </button>
          <button
            className="cards__transaction__content__header__filterBtn"
            onClick={() => handleSort("amount")}
          >
            {t("card.table.filter3")}
            <Image
              src="/assets/cards/arrows.png"
              alt="arrows"
              width={24}
              height={24}
              className="cards__transaction__content__header__filterBtn__icon"
            />
          </button>
        </div>
        <div className="cards__transaction__content__body">
          {cardData.length === 0 ? (
            <div className="no__action">{t("card.no.contract")}</div>
          ) : (
            cardData.map((action) => (
              <CardActionItem key={action._id} {...action} />
            ))
          )}
        </div>
      </div>
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
    </div>
  );
};

export default CardsTransaction;
