import Image from "next/image";

import "@/sass/scenes/_transactionsUp.scss";

const TransactionsUp = () => {
  return (
    <div className="transactions__upcoming">
      <Image
        src="/assets/transactions/up.png"
        alt="up"
        width={32}
        height={32}
        className="transactions__upcoming__icon"
      />
      <div className="transactions__upcoming__data">
        <div className="transactions__upcoming__data__title">
          Upcoming Payment
        </div>
        <div className="transactions__upcoming__data__date">
          April 12th, <span>2024</span>
        </div>
        <button className="transactions__upcoming__data__btn">
          Send Reminder
        </button>
      </div>
    </div>
  );
};

export default TransactionsUp;
