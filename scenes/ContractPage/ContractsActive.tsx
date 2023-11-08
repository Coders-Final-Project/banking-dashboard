"use client";

import Image from "next/image";

import "@/sass/scenes/_contractsActive.scss";

import ContractsItem from "@/components/ContractsItem/ContractsItem";

import axios from "axios";

import { useGlobalContext } from "@/context/store";

import { useSelector, useDispatch } from "react-redux";
import { setCompanyContracts } from "@/globalRedux/features/appSlice";

import { StateProps } from "@/interface";

import { cache, useEffect } from "react";

const ContractsActive = () => {
  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const companyContracts = useSelector(
    (state: StateProps) => state.companyContracts,
  );

  useEffect(() => {
    const fetchCompanyContracts = cache(async () => {
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
    });

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
        {companyContracts?.map((contract) => (
          <ContractsItem key={contract._id} {...contract} />
        ))}
      </div>
    </div>
  );
};

export default ContractsActive;

export const revalidate = 10;
