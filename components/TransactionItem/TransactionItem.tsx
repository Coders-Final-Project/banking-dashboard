import Image from "next/image";

import "@/sass/components/_transactionItem.scss";

import { ITransactions } from "@/interface";

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
}: ITransactions) => {
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
          {amount}₼
        </div>
        <div className="home__content__transaction__body__person__amount__date">
          19 November
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
