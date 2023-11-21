"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import "@/sass/scenes/_cardsTransaction.scss";
import CardActionItem from "@/components/CardActionItem/CardActionItem";

import { filterCardsTable } from "@/helpers";

import axios from "axios";

import { useGlobalContext } from "@/context/store";

import { useSelector, useDispatch } from "react-redux";
import { setContractual } from "@/globalRedux/features/appSlice";

import { StateProps } from "@/interface";

const CardsTransaction = () => {
  const [check, setCheck] = useState(false);

  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  useEffect(() => {
    const fetchCompanyContracts = async () => {
      try {
        if (data._id) {
          const response = await axios.post("/api/contractual", {
            userID: data._id,
          });
          dispatch(setContractual(response.data.contractuals));
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCompanyContracts();
  }, [data, dispatch]);

  const contractual = useSelector((state: StateProps) => state.contractual);

  const [cardData, setCardData] = useState(contractual);

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
        <div className="cards__transaction__heading__title">All Contracts</div>
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
            <CardActionItem key={action._id} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsTransaction;
