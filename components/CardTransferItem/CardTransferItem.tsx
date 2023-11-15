"use client";

import Image from "next/image";

import { use, useEffect, useState } from "react";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { useGlobalContext } from "@/context/store";

import "@/sass/components/_cardTransferItem.scss";
import { setUserCardInfo } from "@/globalRedux/features/appSlice";

interface IProps {
  imgUrlEnd: string;
  text: string;
}

const CardTransferItem = ({ imgUrlEnd, text }: IProps) => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const { data } = useGlobalContext();

  const dispatch = useDispatch();

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

  // const handleFundTransfer = async () => {
  //   try {
  //     if (data._id && cardNumber.length === 19 && amount !== "") {
  //       const response = await axios.post("/api/card/transfer", {
  //         userID: data._id,
  //         cardNumber,
  //         amount,
  //       });

  //       console.log(response);

  //       if (
  //         response.data &&
  //         response.data.card &&
  //         response.data.card[0] !== undefined
  //       ) {
  //         dispatch(setUserCardInfo(response.data.card[0]));
  //         setSuccessAlert(true);
  //       } else {
  //         setErrorAlert(true);
  //       }

  //       setSuccessAlert(true);
  //     } else {
  //       setCardNumber("");
  //       setAmount("");
  //       setErrorAlert(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setErrorAlert(true);
  //   } finally {
  //     setCardNumber("");
  //     setAmount("");
  //   }
  // };

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
            type="text"
            className="transfer__content__body__input"
            placeholder="Card number"
            value={cardNumber}
            onChange={handleChange}
            minLength={19}
            maxLength={19}
          />
          <input
            type="number"
            className="transfer__content__body__input"
            placeholder="Amount (AZN)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="transfer__content__body__sendBtn"
            onClick={handleFundTransfer}
          >
            Send
          </button>
        </div>
      )}
      {errorAlert && (
        <div className="transfer__content__alert--error">
          Something went wrong!
        </div>
      )}
      {successAlert && (
        <div className="transfer__content__alert--success">
          Successfull transfer!
        </div>
      )}
    </div>
  );
};

export default CardTransferItem;
