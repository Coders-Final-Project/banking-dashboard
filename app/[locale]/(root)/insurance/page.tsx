"use client";

import { useState } from "react";

import Image from "next/image";

import "@/sass/pages/_insurance.scss";
import "@/sass/layout/_pageHeader.scss";

import axios from "axios";
import { useGlobalContext } from "@/context/store";

import { useRouter } from "next/navigation";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import { insuranceCoverages } from "@/db/insurance";
import { StateProps } from "@/interface";
import { useSelector } from "react-redux";

const Insurance = () => {
  const [isCoverageOpen, setIsCoverageOpen] = useState(true);

  const router = useRouter();

  const { data } = useGlobalContext();

  const { userCard, insuranceCompleted } = useSelector(
    (state: StateProps) => state,
  );

  const handleCoverage = () => {
    setIsCoverageOpen((prevValue) => !prevValue);
  };

  const handleAddInsurance = async () => {
    if (userCard._id === -1) {
      router.push("/cards");
      return;
    }

    try {
      if (data._id) {
        const response = await axios.post("/api/insurance", {
          userID: data._id,
        });

        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="insurance">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Get Insured</div>
          <div className="page__header__welcome__desc">
            We negotiated exclusive discounts for you, so that you can save
            money on insurance.
          </div>
        </div>
        <AvatarDetail />
      </header>
      <div className="insurance__place">
        <div className="insurance__place__text">I live in</div>
        <select className="insurance__place__options">
          <option value="azerbaijan">Azerbaijan</option>
          <option value="turkey">Turkey</option>
          <option value="germany">Germany</option>
          <option value="spain">Spain</option>
        </select>
      </div>
      <div className="insurance__content">
        <div className="insurance__content__card">
          <div className="insurance__content__card__header">
            <Image
              src="/assets/insurance/logo.png"
              alt="logo"
              width={110}
              height={40}
              className="insurance__content__card__header__img"
            />
            <div className="insurance__content__card__header__price">
              $50<span>/month</span>
            </div>
            <div className="insurance__content__card__header__divider" />
            {insuranceCompleted ? (
              <div className="insurance__content__card__header__done">
                You applied already!
              </div>
            ) : (
              <button
                className="insurance__content__card__header__btn"
                onClick={handleAddInsurance}
              >
                {userCard._id === -1
                  ? "Add Card Before Apply"
                  : "Apply for Coverage"}
              </button>
            )}
          </div>
          <div className="insurance__content__card__divider" />
          <div className="insurance__content__card__desc">
            Genki is an excellent health insurance for digital nomads,
            freelancers and remote workers. It provides cover from one month up
            to two years in a monthly subscription that can be cancelled
            anytime.
          </div>
          <div className="insurance__content__card__coverage">
            <div className="insurance__content__card__coverage__title">
              <button
                className="insurance__content__card__coverage__title__btn"
                onClick={handleCoverage}
              >
                What is included in coverage?
              </button>
              {isCoverageOpen ? (
                <Image
                  src="/assets/insurance/up-arrow.png"
                  alt="arrow"
                  width={24}
                  height={24}
                  className="insurance__content__card__coverage__title__icon"
                />
              ) : (
                <Image
                  src="/assets/insurance/down-arrow.png"
                  alt="arrow"
                  width={24}
                  height={24}
                  className="insurance__content__card__coverage__title__icon"
                />
              )}
            </div>
            {isCoverageOpen && (
              <div className="insurance__content__card__coverage__content">
                {insuranceCoverages.map((coverage) => (
                  <div
                    key={coverage.id}
                    className="insurance__content__card__coverage__content__item"
                  >
                    {coverage.value}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="insurance__content__card__comment">
            *Price depends on your age, the region of cover you choose and the
            deductible you choose
          </div>
          <Image
            src="/assets/insurance/msg.png"
            alt="message"
            width={48}
            height={48}
            className="insurance__content__card__icon"
          />
        </div>
      </div>
    </main>
  );
};

export default Insurance;
