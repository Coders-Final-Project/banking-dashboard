"use client";

import Image from "next/image";

import "@/sass/components/_contractsItem.scss";

import { defineCompanyImage } from "@/helpers";

import { useState } from "react";

import { ICompanyContracts } from "@/interface";

import { useDispatch } from "react-redux";
import { removeContract } from "@/globalRedux/features/appSlice";

import axios from "axios";

const ContractsItem = ({
  client,
  company,
  rate,
  date,
  _id,
}: ICompanyContracts) => {
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);

  const dispatch = useDispatch();

  const handleOpenContract = () => {
    setIsDeleteBtnClicked(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteBtnClicked(false);
  };

  const handleDeleteContract = async () => {
    try {
      await axios.post("api/contracts/delete", {
        contractID: _id,
      });

      setIsDeleteBtnClicked(false);

      dispatch(removeContract(_id));
    } catch (error) {
      console.log(error);
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
            Fixed Rate
          </div>
        </div>
      </div>
      <div className="contracts__content__active__body__item__divider" />
      <div className="contracts__content__active__body__item__secondary">
        <div className="contracts__content__active__body__item__secondary__period">
          <div className="contracts__content__active__body__item__secondary__period__title">
            Contract Period
          </div>
          <div className="contracts__content__active__body__item__secondary__period__date">
            {/* {startDate} - {endDate} */}
            {date}
          </div>
        </div>
        <div className="contracts__content__active__body__item__secondary__client">
          <div className="contracts__content__active__body__item__secondary__client__title">
            Client Name
          </div>
          <div className="contracts__content__active__body__item__secondary__client__name">
            {client}
          </div>
        </div>
      </div>
      <button className="contract__delete__btn" onClick={handleOpenContract}>
        <Image
          src="/assets/contracts/remove.png"
          alt="remove"
          width={24}
          height={24}
        />
      </button>
      {isDeleteBtnClicked && (
        <div className="notify__user__modal">
          <div className="notify__user__modal__content">
            <div className="notify__user__modal__content__text">
              If this contract is removed, an additional 50 AZN will be deducted
              from your balance. Are you sure?
            </div>
            <div className="notify__user__modal__content__btns">
              <button
                className="notify__user__modal__content__btns__cancel"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="notify__user__modal__content__btns__confirm"
                onClick={handleDeleteContract}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractsItem;
