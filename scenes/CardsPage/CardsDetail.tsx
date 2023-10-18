"use client";

import { useState } from "react";

import Image from "next/image";

import "@/sass/scenes/_cardsDetail.scss";

import CardInfo from "@/components/CardInfo/CardInfo";
import CardReportItem from "@/components/CardReportItem/CardReportItem";
import AddCardModal from "@/components/AddCardModal/AddCardModal";

const CardsAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowALert] = useState(false);

  const handleCardModal = () => {
    if (isModalOpen) {
      setShowALert(true);

      setTimeout(() => {
        setShowALert(false);
      }, 2000);
    }

    setIsModalOpen((prevValue) => !prevValue);
  };

  return (
    <div className="cards__detail">
      <div className="cards__detail__add">
        <div className="cards__detail__add__title">Your Cards</div>
        <button className="cards__detail__add__btn" onClick={handleCardModal}>
          Add Card <span>+</span>
        </button>
      </div>
      <Image
        src="/assets/cards/card.png"
        alt="card"
        width={328}
        height={200}
        className="cards__detail__cardImg"
      />
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
      {isModalOpen && <AddCardModal handleCardModal={handleCardModal} />}
      {showAlert && <div className="success__msg">Card Added</div>}
    </div>
  );
};

export default CardsAdd;
