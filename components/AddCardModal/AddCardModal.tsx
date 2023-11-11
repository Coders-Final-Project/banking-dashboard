"use client";

import { useState } from "react";

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

const AddCardModal = ({ handleCardModal, setShowALert }: IProps) => {
  const [cardValues, setCardValues] = useState<ICardFormVaues>(INITIAL_VALUES);

  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data._id) {
      const response = await axios.post("api/card", {
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
          <label htmlFor="cardNumber">Card Number</label>
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
          <label htmlFor="date">End Date</label>
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
          <label htmlFor="security">Security Code</label>
          <input
            type="text"
            id="security"
            placeholder="000"
            name="securityCode"
            value={cardValues.securityCode}
            required
            onChange={handleChange}
            minLength={3}
            maxLength={3}
          />
        </div>
        <button className="cards__detail__addModal__btn" type="submit">
          Send
        </button>
      </div>
      <button
        className="add__card__modal__closeBtn"
        type="button"
        onClick={handleCardModal}
      >
        x
      </button>
    </form>
  );
};

export default AddCardModal;
