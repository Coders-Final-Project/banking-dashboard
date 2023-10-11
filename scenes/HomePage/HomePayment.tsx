"use client";

import { useState } from "react";

import "@/sass/scenes/_homePayment.scss";

import HomeLineChart from "@/charts/HomeLineChart";

import { userPaymentHistory } from "@/db/user";

import { IUserPayment } from "@/interface";

import { findTotalPayment } from "@/helpers/findTotalPayment";

const HomePayment = () => {
  const [duration, setDuration] = useState("1M");

  const changeActiveBtn = (e: any) => {
    setDuration(e.target.value);
  };

  const { fullPart, fractioanalPart } = findTotalPayment({
    duration,
    userPaymentHistory,
  });

  return (
    <div className="home__content__payment">
      <div className="home__content__payment__firstLine">
        <div className="home__content__payment__firstLine__title">
          Payment History
        </div>
        <div className="home__content__payment__firstLine__btnGroups">
          <button
            className={`home__content__payment__firstLine__btnGroups__btn ${
              duration === "1M" && "active"
            }`}
            value={"1M"}
            onClick={(e) => changeActiveBtn(e)}
          >
            1M
          </button>
          <button
            className={`home__content__payment__firstLine__btnGroups__btn ${
              duration === "3M" && "active"
            }`}
            value={"3M"}
            onClick={(e) => changeActiveBtn(e)}
          >
            3M
          </button>
          <button
            className={`home__content__payment__firstLine__btnGroups__btn ${
              duration === "6M" && "active"
            }`}
            value={"6M"}
            onClick={(e) => changeActiveBtn(e)}
          >
            6M
          </button>
          <button
            className={`home__content__payment__firstLine__btnGroups__btn ${
              duration === "1Y" && "active"
            }`}
            value={"1Y"}
            onClick={(e) => changeActiveBtn(e)}
          >
            1Y
          </button>
        </div>
      </div>
      <div className="home__content__payment__secondLine">
        <div className="home__content__payment__secondLine__number">
          ${fullPart}
          {fractioanalPart && <span>.{fractioanalPart.slice(0, 2)}</span>}
        </div>
        <div className="home__content__payment__secondLine__difference">
          <span>+23%</span> vs last month
        </div>
      </div>
      <HomeLineChart
        duration={duration}
        userPaymentHistory={userPaymentHistory}
      />
    </div>
  );
};

export default HomePayment;
