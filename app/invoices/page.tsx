import React from "react";
import "@/sass/pages/_home.scss";
import "@/sass/pages/_invoices.scss";
import { user } from "@/db/user";
import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import Image from "next/image";

const Invoices = () => {
  return (
    <>
      <main className="home">
        <header className="home__header">
          <div className="home__header__welcome">
            <div className="home__header__welcome__title">Invoices</div>
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
                <button>
                  <img
                    src="/assets/invoices/edit.png"
                    alt="copy"
                    height={24}
                    width={24}
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
      </main>
    </>
  );
};

export default Invoices;
