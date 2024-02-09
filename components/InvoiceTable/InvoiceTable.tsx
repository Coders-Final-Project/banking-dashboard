"use client";

import React, { useEffect, useState } from "react";
import "@/sass/components/_invoiceTable.scss";
import Image from "next/image";

import { getFormattedDate } from "@/helpers";

import { IInvoices } from "@/interface";

import axios from "axios";

import useSWR from "swr";
import { useGlobalContext } from "@/context/store";

const InvoiceTable = () => {
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
    }
  }, [errorAlert]);

  const { data } = useGlobalContext();

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error: any) {
      setErrorAlert(error?.message);
    }
  };

  const {
    data: invoices,
    mutate,
    isLoading,
  } = useSWR(`/api/invoice/fetch/${data._id}`, fetcher);

  return (
    <>
      <div>
        {isLoading && <div className="no-invoice">Loading...</div>}

        {invoices?.data?.invoices.length === 0 ? (
          <div className="no-invoice">There is no invoice yet!</div>
        ) : (
          invoices?.data?.invoices?.map((item: IInvoices, index: number) => {
            const { formattedDate } = getFormattedDate(item.createdAt);

            return (
              <div className="invoiceTable__container" key={index}>
                <div className="invoiceTable__container__item">{item.no}</div>
                <div className="invoiceTable__container__item">
                  {formattedDate}
                </div>
                <div className="invoiceTable__container__item">
                  {item.client}
                </div>
                <div className="invoiceTable__container__item">
                  {item.amount}₼
                </div>
                <div
                  className="invoiceTable__container__item"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    {...(item.status == "PENDING"
                      ? { className: "yellow" }
                      : { className: "green" })}
                  >
                    {item.status}
                  </div>
                  <Image
                    src="/assets/invoices/3dots.png"
                    alt="dots"
                    width={24}
                    height={24}
                    className="functional--btns"
                  />
                </div>
              </div>
            );
          })
        )}
        {errorAlert !== "" && (
          <div className="invoice__table__alert--error">{errorAlert}</div>
        )}
      </div>
    </>
  );
};

export default InvoiceTable;
