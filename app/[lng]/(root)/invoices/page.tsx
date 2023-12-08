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

import { useTranslation } from "@/i18n/client";

const Invoices = ({ params: { lng } }: { params: { lng: string } }) => {
  const [invoiceData, setInvoiceData] = useState<IInvoicesData[]>(invoicesData);
  const [changeState, setChangeState] = useState<boolean>(false);
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const { t } = useTranslation(lng);

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
            <div className="page__header__welcome__title">
              {t("invoice.main.title")}
            </div>
          </div>
          <AvatarDetail />
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
                <p>{t("invoice.line1.title")}</p>
                <p>
                  $3,855<span>.50</span>
                </p>
                <p>
                  <span>+15%</span> vs {t("invoice.line1.compare")}
                </p>
              </div>
            </div>
            <div className="item2">
              <div>
                <p>{t("invoice.line1.case1")}</p>
                <p>
                  $1,346<span>.65</span>
                </p>
              </div>
              <div>
                <p>{t("invoice.line1.case2")}</p>
                <p>
                  $50<span>.66</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid__container__quickPay">
            <p className="grid__container__quickPay__title">
              {t("invoice.line2.title")}
            </p>

            <div className="grid__container__quickPay__links">
              <div>
                invopay.to/<span>clientname</span>
              </div>
              <div>
                <button onClick={openSidemenu}>
                  <Image
                    src="/assets/invoices/edit.png"
                    alt="edit"
                    height={24}
                    width={24}
                    style={{ cursor: "pointer" }}
                  />
                </button>
                <button>
                  <Image
                    src="/assets/invoices/copy.png"
                    alt="copy"
                    height={24}
                    width={24}
                  />
                </button>
              </div>
            </div>

            <div className="grid__container__quickPay__text">
              <p>{t("invoice.line2.text")}</p>
              <p>{t("invoice.line2.btn")}</p>
            </div>
          </div>

          <div className="grid__container__overdue">
            <div>{t("invoice.line3.title")}</div>
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
            <div>{t("invoice.table.title")}</div>
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
                <p>{t("invoice.filter.title1")}</p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p>{t("invoice.filter.title2")}</p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p>{t("invoice.filter.title3")}</p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p onClick={() => handleSubmit("amount")}>
                  {t("invoice.filter.title4")}
                </p>
                <Image
                  src="/assets/invoices/arrows.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p onClick={() => handleSubmit("PENDING")}>
                  {t("invoice.filter.title5")}
                </p>
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
