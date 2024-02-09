"use client";

import Image from "next/image";

import "@/sass/components/_contractsItem.scss";

import { defineCompanyImage } from "@/helpers";

import { useState, useEffect } from "react";

import { ICompanyContracts } from "@/interface";

import { useDispatch } from "react-redux";
import { increaseNotificationCount } from "@/globalRedux/features/appSlice";

import axios from "axios";

import { useTranslation } from "@/i18n/client";

import { useSWRConfig } from "swr";
import { useGlobalContext } from "@/context/store";

const ContractsItem = ({
  client,
  company,
  rate,
  date,
  _id,
  lng,
}: ICompanyContracts) => {
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  const { data } = useGlobalContext();

  const { mutate } = useSWRConfig();

  const { t } = useTranslation(lng);

  const dispatch = useDispatch();

  const handleOpenContract = () => {
    setIsDeleteBtnClicked(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteBtnClicked(false);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
    }
  }, [success, errorAlert]);

  const handleDeleteContract = async (id: number) => {
    try {
      await axios.delete(`/api/contracts/delete/${id}`);

      setIsDeleteBtnClicked(false);
      dispatch(increaseNotificationCount());
      mutate(`/api/contracts/fetch/${data._id}`);
      setSuccess(true);
    } catch (error: any) {
      setErrorAlert("Something went wrong!");
    }
  };

  return (
    <div className="contracts__content__active__body__item">
      <div className="contracts__content__active__body__item__main">
        <Image
          src={`/assets/contracts/${defineCompanyImage(company)}`}
          alt={company}
          width={48}
          height={48}
          className="contracts__content__active__body__item__main__img"
        />
        <div className="contracts__content__active__body__item__main__detail">
          <div className="contracts__content__active__body__item__main__detail__name">
            {company}
          </div>
          <div className="contracts__content__active__body__item__main__detail__location">
            Azerbaijan
          </div>
        </div>
        <div className="contracts__content__active__body__item__main__amount">
          <div className="contracts__content__active__body__item__main__amount__number">
            {rate} ₼
          </div>
          <div className="contracts__content__active__body__item__main__amount__rate">
            {t("contract.active.item.rate")}
          </div>
        </div>
      </div>
      <div className="contracts__content__active__body__item__divider" />
      <div className="contracts__content__active__body__item__secondary">
        <div className="contracts__content__active__body__item__secondary__period">
          <div className="contracts__content__active__body__item__secondary__period__title">
            {t("contract.active.item.period")}
          </div>
          <div className="contracts__content__active__body__item__secondary__period__date">
            {date}
          </div>
        </div>
        <div className="contracts__content__active__body__item__secondary__client">
          <div className="contracts__content__active__body__item__secondary__client__title">
            {t("contract.active.item.name")}
          </div>
          <div className="contracts__content__active__body__item__secondary__client__name">
            {client}
          </div>
        </div>
      </div>
      <button className="contract__delete__btn" onClick={handleOpenContract}>
        <Image
          src="/assets/contracts/delete.png"
          alt="remove"
          width={24}
          height={24}
        />
      </button>
      {isDeleteBtnClicked && (
        <div className="notify__user__modal">
          <div className="notify__user__modal__content">
            <div className="notify__user__modal__content__text">
              {t("contract.modal.text")}
            </div>
            <div className="notify__user__modal__content__btns">
              <button
                className="notify__user__modal__content__btns__cancel"
                onClick={handleCancelDelete}
              >
                {t("contract.modal.cancel.btn")}
              </button>
              <button
                className="notify__user__modal__content__btns__confirm"
                onClick={() => handleDeleteContract(_id)}
              >
                {t("contract.modal.approve.btn")}
              </button>
            </div>
          </div>
        </div>
      )}
      {success && (
        <div className="contractDelete__alert--success">
          {t("contract.delete.message")}
        </div>
      )}
      {errorAlert !== "" && (
        <div className="contractDelete__alert--error">{errorAlert}</div>
      )}
    </div>
  );
};

export default ContractsItem;
