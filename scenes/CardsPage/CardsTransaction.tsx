"use client";

import { useState } from "react";
import Image from "next/image";
import "@/sass/scenes/_cardsTransaction.scss";
import CardActionItem from "@/components/CardActionItem/CardActionItem";
import { cardTransaction } from "@/db/card";
import { filterCardsTable } from "@/helpers";

const CardsTransaction = () => {
  const [cardData, setCardData] = useState(cardTransaction);
  const [check, setCheck] = useState(false);

  const handleSort = (input: string) => {
    setCheck((prevValue) => !prevValue);

    if (input === "name" || input === "date" || input === "amount") {
      const sortedData =
        filterCardsTable({ input, data: cardTransaction, check }) || [];
      setCardData(sortedData);
    }
  };

  return (
    <div className="cards__transaction">
      <div className="cards__transaction__heading">
        <div className="cards__transaction__heading__title">
          Recent Transactions
        </div>
        <button className="cards__transaction__heading__filterBtn">
          <Image
            src="/assets/cards/filter.png"
            alt="filter-btn"
            width={24}
            height={24}
            className="cards__transaction__heading__filterBtn__icon"
          />
          <p className="cards__transaction__heading__filterBtn__text">
            Sort & Filter
          </p>
        </button>
      </div>
      <div className="cards__transaction__content">
        <div className="cards__transaction__content__header">
          <button
            className="cards__transaction__content__header__filterBtn"
            onClick={() => handleSort("name")}
          >
            Name
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
            Date
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
            Amount
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
          {cardData.map((action) => (
            <CardActionItem key={action.id} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsTransaction;
