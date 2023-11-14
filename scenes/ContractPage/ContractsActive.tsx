"use client";

import Image from "next/image";
import Link from "next/link";

import "@/sass/scenes/_contractsActive.scss";

import ContractsItem from "@/components/ContractsItem/ContractsItem";

import axios from "axios";

import { useGlobalContext } from "@/context/store";

import { useSelector, useDispatch } from "react-redux";
import {
  setCompanyContracts,
  setUserCardInfo,
} from "@/globalRedux/features/appSlice";

import { StateProps } from "@/interface";

import { useEffect } from "react";

const ContractsActive = () => {
  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const { companyContracts, userCard } = useSelector(
    (state: StateProps) => state,
  );

  useEffect(() => {
    const fetchCompanyContracts = async () => {
      try {
        if (data._id) {
          const response = await axios.post("/api/contracts/fetch", {
            userID: data._id,
          });
          dispatch(setCompanyContracts(response.data.contracts));
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCompanyContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="contracts__content__active">
      <div className="contracts__content__active__header">
        <div className="contracts__content__active__header__title">
          Active Contracts
        </div>
        <Image
          src="/assets/contracts/dot.png"
          alt="dot"
          width={24}
          height={24}
          className="contracts__content__active__header__icon"
        />
      </div>
      <div className="contracts__content__active__body">
        {userCard._id === -1 && (
          <Link
            href="/cards"
            className="contracts__content__active__body__empty"
          >
            Add card in order to create any contract
          </Link>
        )}

        {companyContracts?.map((contract) => (
          <ContractsItem key={contract._id} {...contract} />
        ))}
      </div>
    </div>
  );
};

export default ContractsActive;
