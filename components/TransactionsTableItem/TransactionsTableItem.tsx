import Image from "next/image";

import "@/sass/components/_transactionsTableItem.scss";

interface IProps {
  personName: string;
  personImg: string;
  company: string;
  paymentDate: string;
  paymentHour: string;
  paymentMethodUrl: string;
  paymentTitle: string;
  paidDate: string;
  price: string;
}

const TransactionsTableItem = ({
  personName,
  personImg,
  company,
  paymentDate,
  paymentHour,
  paymentMethodUrl,
  paymentTitle,
  paidDate,
  price,
}: IProps) => {
  return (
    <div className="transactions__table__item">
      <Image
        src={personImg}
        alt={personName}
        width={40}
        height={40}
        className="transactions__table__item__img"
      />
      <div className="transactions__table__item__personDetail">
        <div className="transactions__table__item__personDetail__name">
          {personName}
        </div>
        <div className="transactions__table__item__personDetail__company">
          {company}
        </div>
      </div>
      <div className="transactions__table__item__payment">
        <div className="transactions__table__item__payment__date">
          {paymentDate}
        </div>
        <div className="transactions__table__item__payment__hour">
          {paymentHour}
        </div>
      </div>
      <div className="transactions__table__item__method">
        <Image
          src={paymentMethodUrl}
          alt={paymentTitle}
          width={20}
          height={20}
          className="transactions__table__item__method__img"
        />
        <div className="transactions__table__item__method__text">
          {paymentTitle}
        </div>
      </div>
      <div className="transactions__table__item__paidDate">
        <div className="transactions__table__item__paidDate__amount">
          {price}
        </div>
        <div className="transactions__table__item__paidDate__date">
          {paidDate}
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
        Send Invoice
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
