"use client";

import "@/sass/pages/_cards.scss";
import "@/sass/layout/_pageHeader.scss";

import "@/sass/pages/_cards.scss";

import axios from "axios";

import { useDispatch } from "react-redux";

import { setUserCardInfo } from "@/globalRedux/features/appSlice";

import { useEffect } from "react";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import CardsSummary from "@/scenes/CardsPage/CardsSummary";
import CardsReport from "@/scenes/CardsPage/CardsReport";
import CardsTransaction from "@/scenes/CardsPage/CardsTransaction";
import CardsDetail from "@/scenes/CardsPage/CardsDetail";
import { useGlobalContext } from "@/context/store";

const Cards = () => {
  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        if (data._id) {
          const response = await axios.post("/api/card/fetch", {
            userID: data._id,
          });

          if (response.data.card[0] !== undefined) {
            dispatch(setUserCardInfo(response.data.card[0]));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCardInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <main className="cards">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Cards</div>
        </div>
        <AvatarDetail />
      </header>
      <div className="cards__content">
        <div className="cards__content__stats">
          <CardsSummary />
          <CardsReport />
          <CardsTransaction />
        </div>
        <CardsDetail />
      </div>
    </main>
  );
};

export default Cards;
