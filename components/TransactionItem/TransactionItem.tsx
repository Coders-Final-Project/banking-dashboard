import Image from "next/image";

import "@/sass/components/_transactionItem.scss";

interface ITransactionItem {
  id: number;
  imgUrl: string;
  personName: string;
  company: string;
  amount: string;
  date: string;
}

const TransactionItem = (person: ITransactionItem) => {
  return (
    <div className="home__content__transaction__body__person">
      <Image
        src={person.imgUrl}
        alt={person.personName}
        width={48}
        height={48}
        className="home__content__transaction__body__person__img"
      />
      <div className="home__content__transaction__body__person__info">
        <div className="home__content__transaction__body__person__info__name">
          {person.personName}
        </div>
        <div className="home__content__transaction__body__person__info__company">
          {person.company}
        </div>
      </div>
      <div className="home__content__transaction__body__person__amount">
        <div className="home__content__transaction__body__person__amount__number">
          ${person.amount}
        </div>
        <div className="home__content__transaction__body__person__amount__date">
          {person.date}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
