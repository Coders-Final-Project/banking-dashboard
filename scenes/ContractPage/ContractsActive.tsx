"use client";

import Image from "next/image";
import Link from "next/link";

import "@/sass/scenes/_contractsActive.scss";

import ContractsItem from "@/components/ContractsItem/ContractsItem";

import axios from "axios";

import { useGlobalContext } from "@/context/store";

import { useSelector, useDispatch } from "react-redux";
import { setCompanyContracts } from "@/globalRedux/features/appSlice";

import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

import { useEffect } from "react";

const ContractsActive = ({ lng }: { lng: string }) => {
  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const { t } = useTranslation(lng);

  const companyContracts = useSelector(
    (state: StateProps) => state.companyContracts,
  );

  const userCard = useSelector((state: StateProps) => state.userCard);

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

    return () => {
      fetchCompanyContracts();
    };
  }, [data, dispatch]);

  return (
    <div className="contracts__content__active">
      <div className="contracts__content__active__header">
        <div className="contracts__content__active__header__title">
          {t("contract.active.title")}
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
            {t("contract.active.noCard")}
          </Link>
        )}

        {companyContracts.length === 0 && userCard._id !== -1 && (
          <div className="no__contract"> {t("contract.active.noContract")}</div>
        )}

        {companyContracts?.map((contract) => (
          <ContractsItem key={contract._id} {...contract} lng={lng} />
        ))}
      </div>
    </div>
  );
};

export default ContractsActive;
