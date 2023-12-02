import Image from "next/image";

import "@/sass/components/_transactionItem.scss";

import { ITransactions } from "@/interface";

import { getFormattedDate } from "@/helpers";

interface ITransactionItem {
  receiverName: string;
  receiverSurname: string;
  receiverJob: string;
  createdAt: string;
  amount: string;
}

const TransactionItem = ({
  receiverName,
  receiverSurname,
  receiverJob,
  amount,
  createdAt,
}: ITransactions) => {
  const { formattedDate } = getFormattedDate(createdAt);

  return (
    <div className="home__content__transaction__body__person">
      <Image
        src="/assets/home/people.png"
        alt={receiverName}
        width={48}
        height={48}
        className="home__content__transaction__body__person__img"
      />
      <div className="home__content__transaction__body__person__info">
        <div className="home__content__transaction__body__person__info__name">
          {receiverName} {receiverSurname}
        </div>
        <div className="home__content__transaction__body__person__info__company">
          {receiverJob}
        </div>
      </div>
      <div className="home__content__transaction__body__person__amount">
        <div className="home__content__transaction__body__person__amount__number">
          -{amount}₼
        </div>
        <div className="home__content__transaction__body__person__amount__date">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
