import Image from "next/image";

import "@/sass/components/_transactionsTableButton.scss";

const TransactionTableButton = ({
  img,
  text,
}: {
  img: string;
  text: string;
}) => {
  return (
    <button className="transactions__table__btn">
      <Image
        src={`/assets/transactions/${img}`}
        alt={text}
        width={24}
        height={24}
        className="transactions__table__btn__img"
      />
      <div className="transactions__table__btn__text">{text}</div>
    </button>
  );
};

export default TransactionTableButton;
