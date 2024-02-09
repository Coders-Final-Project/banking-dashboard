"use client";

import Image from "next/image";

import { useState } from "react";

import "@/sass/scenes/_contractsActive.scss";

import ContractsItem from "@/components/ContractsItem/ContractsItem";

import axios from "axios";

import { useGlobalContext } from "@/context/store";

import { ICompanyContracts } from "@/interface";

import { useTranslation } from "@/i18n/client";

import { useEffect } from "react";

import useSWR from "swr";

const ContractsActive = ({ lng }: { lng: string }) => {
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
    }
  }, [errorAlert]);

  const { data } = useGlobalContext();

  const { t } = useTranslation(lng);

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error: any) {
      setErrorAlert(error?.message);
    }
  };

  const {
    data: companyContracts,
    mutate,
    isLoading,
  } = useSWR(`/api/contracts/fetch/${data._id}`, fetcher);

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
        {isLoading && <div className="no__contract">Loading...</div>}

        {companyContracts?.data?.contracts.length === 0 ? (
          <div className="no__contract"> {t("contract.active.noContract")}</div>
        ) : (
          companyContracts?.data?.contracts.map(
            (contract: ICompanyContracts) => (
              <ContractsItem key={contract._id} {...contract} lng={lng} />
            ),
          )
        )}
      </div>
      {errorAlert !== "" && (
        <div className="contract__active__alert--error">{errorAlert}</div>
      )}
    </div>
  );
};

export default ContractsActive;
