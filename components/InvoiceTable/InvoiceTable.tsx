import React from "react";
import "@/sass/components/_invoiceTable.scss";
import Image from "next/image";

import { getFormattedDate } from "@/helpers";

import { IInvoices } from "@/interface";

interface InvoiceTableProps {
  invoices: IInvoices[];
}

const InvoiceTable = ({ invoices }: InvoiceTableProps) => {
  return (
    <>
      <div>
        {invoices.length === 0 ? (
          <div className="no-invoice">There is no invoice yet!</div>
        ) : (
          invoices?.map((item, index) => {
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
      </div>
    </>
  );
};

export default InvoiceTable;
