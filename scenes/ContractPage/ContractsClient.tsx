"use client";

import Image from "next/image";

import { useEffect, useRef } from "react";

import "@/sass/scenes/_contractsClient.scss";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { setAllCustomers } from "@/globalRedux/features/appSlice";

import ContractClientItem from "@/components/ContractClientItem/ContractClientItem";
import { StateProps } from "@/interface";
import { useGlobalContext } from "@/context/store";

import { useTranslation } from "@/i18n/client";

const ContractsClient = ({ lng }: { lng: string }) => {
  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const allCustomers = useSelector((state: StateProps) => state.allCustomers);

  const { t } = useTranslation(lng);

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current === true) {
      const fetchAllCustomers = async () => {
        try {
          if (data._id) {
            const response = await axios.post(
              "/api/customers",
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

            dispatch(setAllCustomers(response.data.customers));
          }
        } catch (error: any) {
          console.log(error);
        }
      };

      fetchAllCustomers();
    }

    return () => {
      effectRef.current = true;
    };
  }, [data, dispatch]);

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
        {allCustomers.length === 0 && (
          <div className="no__client">{t("contract.client.part.noClient")}</div>
        )}

        {allCustomers.map((client) => (
          <ContractClientItem key={client._id} {...client} lng={lng} />
        ))}
      </div>
    </div>
  );
};

export default ContractsClient;
