"use client";

import { useState } from "react";

import Image from "next/image";

import "@/sass/scenes/_cardsDetail.scss";

import { useSelector } from "react-redux";

import CardInfo from "@/components/CardInfo/CardInfo";
import CardReportItem from "@/components/CardReportItem/CardReportItem";
import AddCardModal from "@/components/AddCardModal/AddCardModal";
import { StateProps } from "@/interface";

const CardsAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showAlert, setShowALert] = useState(false);

  const handleCardModal = () => {
    setIsModalOpen((prevValue) => !prevValue);
  };

  const userCard = useSelector((state: StateProps) => state.userCard);

  return (
    <div className="cards__detail">
      <div className="cards__detail__add">
        <div className="cards__detail__add__title">Your Cards</div>
        {userCard._id === -1 && (
          <button className="cards__detail__add__btn" onClick={handleCardModal}>
            Add Card <span>+</span>
          </button>
        )}
      </div>
      <div className="cards__detail__ownCard">
        <div className="cards__detail__ownCard__content">
          <div className="cards__detail__ownCard__content__balance">
            <div className="cards__detail__ownCard__content__balance__title">
              Currenct Balance
            </div>
            <div className="cards__detail__ownCard__content__balance__amount">
              ${userCard.balance !== 0 ? userCard.balance : "0,000"}
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
      <div className="cards__detail__report">
        <div className="cards__detail__report__title">Your Report</div>
        <div className="cards__detail__report__content">
          <CardReportItem imgUrlEnd="goal.png" text="Goal" />
          <CardReportItem
            imgUrlEnd="monthly-expense.png"
            text="Monthly Expense"
          />
          <CardReportItem
            imgUrlEnd="invoice-income.png"
            text="Invoice Income"
          />
        </div>
      </div>
      {isModalOpen && (
        <AddCardModal
          handleCardModal={handleCardModal}
          setShowALert={setShowALert}
        />
      )}
      {showAlert && <div className="success__msg">Card Added</div>}
    </div>
  );
};

export default CardsAdd;
