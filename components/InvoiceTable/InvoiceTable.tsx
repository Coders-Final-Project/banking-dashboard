import React from "react";
import { IInvoicesData } from "@/interface";
import "@/sass/components/_invoiceTable.scss";
import Image from "next/image";
import { StringifyOptions } from "querystring";

interface IInvoicesProps {
  invoicesData: IInvoicesData[];
  // amount: number | undefined;
  // no: string | undefined;
  // status: string | undefined;
  // client: string | undefined;
  // date: string | undefined;
}

const InvoiceTable = ({ invoicesData }: IInvoicesProps) => {
  return (
    <>
      <div>
        {invoicesData?.map((item) => {
          return (
            <>
              <div className="invoiceTable__container">
                <div className="invoiceTable__container__item">{item.no}</div>
                <div className="invoiceTable__container__item">{item.date}</div>
                <div className="invoiceTable__container__item">
                  {item.client}
                </div>
                <div className="invoiceTable__container__item">
                  ${item.amount}
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
            </>
          );
        })}

        {/* <div className="invoiceTable__container">
          <div className="invoiceTable__container__item">{no}</div>
          <div className="invoiceTable__container__item">{date}</div>
          <div className="invoiceTable__container__item">{client}</div>
          <div className="invoiceTable__container__item">${amount}</div>
          <div
            className="invoiceTable__container__item"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              {...(status == "PENDING"
                ? { className: "yellow" }
                : { className: "green" })}
            >
              {status}
            </div>
            <Image
              src="/assets/invoices/3dots.png"
              alt="dots"
              width={24}
              height={24}
              className="functional--btns"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default InvoiceTable;
