import Image from "next/image";

import "@/sass/components/_transactionItem.scss";

import { ITransactions } from "@/interface";

import { getFormattedDate } from "@/helpers";

const TransactionItem = ({
  receiverName,
  receiverSurname,
  receiverJob,
  amount,
  createdAt,
  profileImg,
}: ITransactions) => {
  const { formattedDate } = getFormattedDate(createdAt);

  const imgUrl = profileImg?.[0]?.fileUrl?.secure_url;

  return (
    <div className="home__content__transaction__body__person">
      <Image
        src={`${imgUrl ? imgUrl : "/assets/home/people.png"}`}
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
