"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import "@/sass/scenes/_contractsClient.scss";

import axios from "axios";

import ContractClientItem from "@/components/ContractClientItem/ContractClientItem";
import { IContractClient, StateProps } from "@/interface";
import { useGlobalContext } from "@/context/store";

import { useTranslation } from "@/i18n/client";

import useSWR from "swr";

const ContractsClient = ({ lng }: { lng: string }) => {
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
    data: allCustomers,
    mutate,
    isLoading,
  } = useSWR(`/api/customers/${data._id}`, fetcher);

  return (
    <div className="contracts__content__client">
      <div className="contracts__content__client__header">
        <div className="contracts__content__client__header__title">
          {t("contract.client.part.title")}
        </div>
        <Image
          src="/assets/contracts/dot.png"
          alt="dot"
          width={24}
          height={24}
          className="contracts__content__client__header__icon"
        />
      </div>
      <div className="contracts__content__client__body">
        {isLoading && <div className="no__client">Loading...</div>}

        {allCustomers?.data?.customers.length === 0 ? (
          <div className="no__client">{t("contract.client.part.noClient")}</div>
        ) : (
          allCustomers?.data?.customers.map((client: IContractClient) => (
            <ContractClientItem key={client._id} {...client} lng={lng} />
          ))
        )}
      </div>
      {errorAlert !== "" && (
        <div className="contract__client__alert--error">{errorAlert}</div>
      )}
    </div>
  );
};

export default ContractsClient;
