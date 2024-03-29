"use client";

import { useEffect, useState, useRef } from "react";

import axios from "axios";

import Image from "next/image";

import "@/sass/scenes/_cardsDetail.scss";

import { useSelector, useDispatch } from "react-redux";

import CardInfo from "@/components/CardInfo/CardInfo";
import CardTransferItem from "@/components/CardTransferItem/CardTransferItem";
import AddCardModal from "@/components/AddCardModal/AddCardModal";
import { StateProps } from "@/interface";

import { numberWithCommas } from "@/helpers";

import { useTranslation } from "@/i18n/client";
import { setUserCardInfo } from "@/globalRedux/features/appSlice";
import { useGlobalContext } from "@/context/store";

const CardsAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState("");

  const [showAlert, setShowALert] = useState(false);

  const handleCardModal = () => {
    setIsModalOpen((prevValue) => !prevValue);
  };

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  const userCard = useSelector((state: StateProps) => state.userCard);

  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current === false) {
      const fetchCardInfo = async () => {
        try {
          if (data._id) {
            const response = await axios.get(`/api/card/fetch/${data._id}`);

            if (response.data.card !== undefined) {
              dispatch(setUserCardInfo(response.data.card));
            }
          }
        } catch (error: any) {
          // setTimeout(() => {
          //   setServerError(error.response.data.message);
          // }, 1000);
        }
      };

      fetchCardInfo();
    }

    return () => {
      effectRef.current = true;
    };
  }, [data._id, dispatch]);

  return (
    <div className="cards__detail">
      <div className="cards__detail__add">
        <div className="cards__detail__add__title">
          {t("cards.detail.title")}
        </div>
        {userCard._id === -1 && (
          <button className="cards__detail__add__btn" onClick={handleCardModal}>
            {t("cards.detail.btn")} <span>+</span>
          </button>
        )}
      </div>
      <div className="cards__detail__ownCard">
        <div className="cards__detail__ownCard__content">
          <div className="cards__detail__ownCard__content__balance">
            <div className="cards__detail__ownCard__content__balance__title">
              {t("cards.own.title")}
            </div>
            <div className="cards__detail__ownCard__content__balance__amount">
              {userCard.balance !== 0
                ? numberWithCommas(String(userCard.balance))
                : "0,000"}{" "}
              ₼
            </div>
          </div>
          <div className="cards__detail__ownCard__content__logo">
            <Image
              src="/assets/cards/payrole.png"
              alt="Payrole"
              width={25}
              height={25}
              className="cards__detail__ownCard__content__logo__img"
            />
            <div className="cards__detail__ownCard__content__logo__text">
              Payrole
            </div>
          </div>
        </div>
        <div className="cards__detail__ownCard__additional">
          <div className="cards__detail__ownCard__additional__cardNumber">
            {userCard.cardNumber !== ""
              ? userCard.cardNumber
              : "1234 5678 9123 4567"}
          </div>
          <div className="cards__detail__ownCard__additional__date">
            {userCard.endDate !== "" ? userCard.endDate : "04/03"}
          </div>
        </div>
        <div className="cards__detail__ownCard__cvv">
          <div className="cards__detail__ownCard__cvv__resource">
            <Image
              src="/assets/cards/payrole.png"
              alt="Payrole"
              width={25}
              height={25}
              className="cards__detail__ownCard__cvv__resource__img"
            />
            <div className="cards__detail__ownCard__cvv__resource__text">
              Payrole
            </div>
          </div>
          <div className="cards__detail__ownCard__cvv__info">
            <div className="cards__detail__ownCard__cvv__info__text">CVV</div>
            <div className="cards__detail__ownCard__cvv__info__value">
              {userCard.securityCode !== "" ? userCard.securityCode : "123"}
            </div>
          </div>
          <div className="cards__detail__ownCard__cvv__logos">
            <Image
              src="/assets/cards/chip.png"
              alt="card_logo"
              width={40}
              height={30}
              className="cards__detail__ownCard__cvv__chip"
            />
            <Image
              src="/assets/cards/frame.png"
              alt="card_logo"
              width={16}
              height={20}
              className="cards__detail__ownCard__cvv__frame"
            />
            <div className="cards__detail__ownCard__cvv__logos__date">
              {userCard.endDate !== "" ? userCard.endDate : "04/03"}
            </div>
          </div>
        </div>
        <div className="cards__detail__ownCard__personName">
          {userCard.userName !== "" ? userCard.userName : "Name"}{" "}
          {userCard.userSurname !== "" ? userCard.userSurname : "Surname"}
        </div>
      </div>
      <CardInfo />
      <div className="cards__detail__divider" />
      <div className="cards__detail__transfer">
        <div className="cards__detail__transfer__title">
          {t("cards.transfer.title")}
        </div>
        <div className="cards__detail__transfer__content">
          <CardTransferItem
            imgUrlEnd="payment.png"
            text={t("cards.transfer.title2")}
          />
        </div>
      </div>
      {isModalOpen && (
        <AddCardModal
          handleCardModal={handleCardModal}
          setShowALert={setShowALert}
        />
      )}
      {showAlert && <div className="success__msg">{t("card.added.alert")}</div>}
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
    </div>
  );
};

export default CardsAdd;
