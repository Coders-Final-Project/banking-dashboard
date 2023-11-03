"use client";

import React, { useState } from "react";
import "@/sass/layout/_pageHeader.scss";
import "@/sass/pages/_invoices.scss";
import { user } from "@/db/user";
import { invoicesData } from "@/db/invoices";
import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import Image from "next/image";
import InvoiceTable from "@/components/InvoiceTable/InvoiceTable";
import { IInvoicesData } from "@/interface";
import { filterInvoiceTable } from "@/helpers";
import Sidemenu from "@/components/Sidemenu/Sidemenu";

const Invoices = () => {
  const [invoiceData, setInvoiceData] = useState<IInvoicesData[]>(invoicesData);
  const [changeState, setChangeState] = useState<boolean>(false);
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const handleSubmit = (input: string) => {
    setChangeState((prev) => !prev);

    if (input == "amount" || "PENDING" || "date") {
      const sortedInvoces = filterInvoiceTable({
        input,
        data: invoicesData,
        changeState,
      });
      setInvoiceData(sortedInvoces as IInvoicesData[]);
    }
  };

  const openSidemenu = () => {
    setOpenSideMenu((prev) => !prev);
  };

  return (
    <>
      <main className="page">
        {openSideMenu ? <Sidemenu setOpenSideMenu={setOpenSideMenu} /> : null}

        <header className="page__header">
          <div className="page__header__welcome">
            <div className="page__header__welcome__title">Invoices</div>
          </div>
          <AvatarDetail {...user} />
        </header>

        <div className="grid__container">
          <div className="grid__container__totalReceived">
            <div className="item1">
              <Image
                src="/assets/invoices/dollar.png"
                alt="$"
                width={32}
                height={32}
              />
              <div>
                <p>Total Received</p>
                <p>
                  $3,855<span>.50</span>
                </p>
                <p>
                  <span>+15%</span> vs last month
                </p>
              </div>
            </div>
            <div className="item2">
              <div>
                <p>PENDING</p>
                <p>
                  $1,346<span>.65</span>
                </p>
              </div>
              <div>
                <p>IN DRAFT</p>
                <p>
                  $50<span>.66</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid__container__quickPay">
            <p className="grid__container__quickPay__title">Qucik Pay</p>

            <div className="grid__container__quickPay__links">
              <div>
                invopay.to/<span>clientname</span>
              </div>
              <div>
                <button onClick={openSidemenu}>
                  <img
                    src="/assets/invoices/edit.png"
                    alt="copy"
                    height={24}
                    width={24}
                    style={{ cursor: "pointer" }}
                  />
                </button>
                <button>
                  <img
                    src="/assets/invoices/copy.png"
                    alt="copy"
                    height={24}
                    width={24}
                  />
                </button>
              </div>
            </div>

            <div className="grid__container__quickPay__text">
              <p>
                You can receive payments quickly with Quick Pay feature. You can
                share the payment link to request the payment to clients.
              </p>
              <p>Learn More</p>
            </div>
          </div>

          <div className="grid__container__overdue">
            <div>Overdue</div>
            <div>
              <div className="circle"></div>
              <div className="price">
                $1,500<span>.50</span>
              </div>
            </div>
          </div>
        </div>

        <div className="invoiceTable">
          <div className="invoiceTable__header">
            <div>Invoices</div>
            <div className="sortBtns">
              <div className="sortBtns__content">
                <div>
                  <Image
                    src="/assets/cards/filter.png"
                    alt="filter-btn"
                    width={24}
                    height={24}
                    className="filterImg"
                  />
                </div>
                <p>Sort & Filter</p>
              </div>
              <div className="sortBtns__content">
                <div>
                  <Image
                    src="/assets/invoices/csv.png"
                    alt="csv-btn"
                    width={24}
                    height={24}
                    className="filterImg"
                  />
                </div>
                <p>CSV</p>
              </div>
            </div>
          </div>

          <div className="invoiceTable__datas">
            <div className="filterBtns">
              <div>
                <p>No</p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p> Date Created</p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p>Client</p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p onClick={() => handleSubmit("amount")}>Amount</p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p onClick={() => handleSubmit("PENDING")}>Status</p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="filteredData">
              {/* {invoiceData?.map((item) => {
                return <InvoiceTable {...item} />;
              })} */}

              <InvoiceTable invoicesData={invoiceData} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Invoices;
