"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import "@/sass/pages/_insurance.scss";
import "@/sass/layout/_pageHeader.scss";

import axios from "axios";
import { useGlobalContext } from "@/context/store";

import { useRouter } from "next/navigation";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import { insuranceCoverages } from "@/db/insurance";
import { StateProps } from "@/interface";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseNotificationCount,
  setInsuranceCompleted,
} from "@/globalRedux/features/appSlice";

import { useTranslation } from "@/i18n/client";

const Insurance = ({ params: { lng } }: { params: { lng: string } }) => {
  const [isCoverageOpen, setIsCoverageOpen] = useState(true);
  const [isApproveClicked, setIsApproveClicked] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const { t } = useTranslation(lng);

  const insuranceCompleted = useSelector(
    (state: StateProps) => state.insuranceCompleted,
  );

  const router = useRouter();

  const dispatch = useDispatch();

  const { data, updateInsuranceCompleted } = useGlobalContext();

  const userCard = useSelector((state: StateProps) => state.userCard);

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    }
  }, [successAlert]);

  const handleCoverage = () => {
    setIsCoverageOpen((prevValue) => !prevValue);
  };

  const handleCancel = () => {
    setIsApproveClicked(false);
  };

  const handleOpenModal = () => {
    setIsApproveClicked(true);
  };

  const handleAddInsurance = async () => {
    if (userCard._id === -1) {
      router.push("/cards");
      return;
    }

    setIsApproveClicked(false);

    try {
      if (data._id) {
        const response = await axios.post(
          "/api/insurance",
          {
            userID: data._id,
          },
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          },
        );

        dispatch(setInsuranceCompleted(response.data.data));
        dispatch(increaseNotificationCount());
        updateInsuranceCompleted(response.data.data);
        setSuccessAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="insurance">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">
            {t("insurance.main.title")}
          </div>
          <div className="page__header__welcome__desc">
            {t("insurance.main.desc")}
          </div>
        </div>
        <AvatarDetail />
      </header>
      <div className="insurance__place">
        <div className="insurance__place__text">{t("insurance.live")}</div>
        <select className="insurance__place__options">
          <option value="azerbaijan">Azerbaijan</option>
          <option value="turkey">Turkey</option>
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
              100₼<span>/{t("insurance.content.year")}</span>
            </div>
            <div className="insurance__content__card__header__divider" />
            {insuranceCompleted ? (
              <div className="insurance__content__card__header__done">
                {t("insurance.content.apply3")}
              </div>
            ) : (
              <button
                className="insurance__content__card__header__btn"
                onClick={handleOpenModal}
              >
                {userCard._id === -1
                  ? `${t("insurance.content.apply1")}`
                  : `${t("insurance.content.apply2")}`}
              </button>
            )}
          </div>
          <div className="insurance__content__card__divider" />
          <div className="insurance__content__card__desc">
            {t("insurance.content.text")}
          </div>
          <div className="insurance__content__card__coverage">
            <div className="insurance__content__card__coverage__title">
              <button
                className="insurance__content__card__coverage__title__btn"
                onClick={handleCoverage}
              >
                {t("insurance.content.btn")}
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
            {t("insurance.content.note")}
          </div>
          <Image
            src="/assets/insurance/msg.png"
            alt="message"
            width={48}
            height={48}
            className="insurance__content__card__icon"
          />
        </div>
        {isApproveClicked && (
          <div className="notify__user__modal">
            <div className="notify__user__modal__content">
              <div className="notify__user__modal__content__text">
                {t("insurance.modal.text1")}
              </div>
              <div className="notify__user__modal__content__btns">
                <button
                  className="notify__user__modal__content__btns__cancel"
                  onClick={handleCancel}
                >
                  {t("insurance.modal.text2")}
                </button>
                <button
                  className="notify__user__modal__content__btns__confirm"
                  onClick={handleAddInsurance}
                >
                  {t("insurance.modal.text3")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {successAlert && (
        <div className="insurance__alert--success">
          {t("insurance.alert.success")}
        </div>
      )}
    </main>
  );
};

export default Insurance;
