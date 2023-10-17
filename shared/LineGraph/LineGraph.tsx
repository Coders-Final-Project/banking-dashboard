"use client";

import { useState } from "react";

import "@/sass/layout/_lineGraph.scss";

import HomeLineChart from "@/charts/HomeLineChart";

import { findTotalPayment } from "@/helpers/findTotalPayment";

import { IUserPayment } from "@/interface";
import { ICardReport } from "@/interface";

interface IProps {
  isHeaderDetail: boolean;
  data: ICardReport | IUserPayment;
}

const LineGraph = ({ isHeaderDetail, data }: IProps) => {
  const [duration, setDuration] = useState("1M");

  const changeActiveBtn = (e: any) => {
    setDuration(e.target.value);
  };

  const { fullPart, fractioanalPart } = findTotalPayment({
    duration,
    data,
  });

  return (
    <div className="line__graph__content">
      <div className="line__graph__content__firstLine">
        <div className="line__graph__content__firstLine__title">
          Payment History
        </div>
        <div className="line__graph__content__firstLine__btnGroups">
          <button
            className={`line__graph__content__firstLine__btnGroups__btn ${
              duration === "1M" && "active"
            }`}
            value={"1M"}
            onClick={(e) => changeActiveBtn(e)}
          >
            1M
          </button>
          <button
            className={`line__graph__content__firstLine__btnGroups__btn ${
              duration === "3M" && "active"
            }`}
            value={"3M"}
            onClick={(e) => changeActiveBtn(e)}
          >
            3M
          </button>
          <button
            className={`line__graph__content__firstLine__btnGroups__btn ${
              duration === "6M" && "active"
            }`}
            value={"6M"}
            onClick={(e) => changeActiveBtn(e)}
          >
            6M
          </button>
          <button
            className={`line__graph__content__firstLine__btnGroups__btn ${
              duration === "1Y" && "active"
            }`}
            value={"1Y"}
            onClick={(e) => changeActiveBtn(e)}
          >
            1Y
          </button>
        </div>
      </div>
      {isHeaderDetail && (
        <div className="line__graph__content__secondLine">
          <div className="line__graph__content__secondLine__number">
            ${fullPart}
            {fractioanalPart && <span>.{fractioanalPart.slice(0, 2)}</span>}
          </div>
          <div className="line__graph__content__secondLine__difference">
            <span>+23%</span> vs last month
          </div>
        </div>
      )}
      <HomeLineChart duration={duration} data={data} />
    </div>
  );
};

export default LineGraph;
