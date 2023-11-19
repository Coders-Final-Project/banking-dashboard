import Image from "next/image";

import "@/sass/components/_transactionsTableItem.scss";

import { ITransactions } from "@/interface";

const TransactionsTableItem = ({
  receiverName,
  receiverSurname,
  receiverJob,
  amount,
}: ITransactions) => {
  return (
    <div className="transactions__table__item">
      <div className="transactions__table__item__person">
        <Image
          src="/assets/transactions/people.png"
          alt={receiverName}
          width={48}
          height={48}
          className="transactions__table__item__person__img"
        />
        <div className="transactions__table__item__person__detail">
          <div className="transactions__table__item__person__detail__name">
            {receiverName} {receiverSurname}
          </div>
          <div className="transactions__table__item__person__detail__company">
            {receiverJob}
          </div>
        </div>
      </div>
      <div className="transactions__table__item__payment">
        <div className="transactions__table__item__payment__date">
          {/* {paymentDate} */}
          18 November
        </div>
        <div className="transactions__table__item__payment__hour">
          {/* {paymentHour} */}
          16:00
        </div>
      </div>
      <div className="transactions__table__item__method">
        <Image
          src="/assets/transactions/paypal.png"
          alt="Paypal"
          width={20}
          height={20}
          className="transactions__table__item__method__img"
        />
        <div className="transactions__table__item__method__text">Paypal</div>
      </div>
      <div className="transactions__table__item__paidDate">
        <div className="transactions__table__item__paidDate__amount">
          {amount}₼
        </div>
        <div className="transactions__table__item__paidDate__date">
          {/* {paidDate} */}
          18 November
        </div>
      </div>
      <button className="transactions__table__item__invoiceBtn">
        <Image
          src="/assets/transactions/invoice.png"
          alt="invoice"
          width={24}
          height={24}
          className="transactions__table__item__invoiceBtn__icon"
        />
        Send Funds
      </button>
      <Image
        src="/assets/transactions/dot.png"
        alt="dot"
        width={24}
        height={24}
        className="transactions__table__item__dotIcon"
      />
    </div>
  );
};

export default TransactionsTableItem;
