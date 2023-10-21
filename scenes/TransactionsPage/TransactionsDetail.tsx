import Image from "next/image";

import "@/sass/scenes/_transactionsDetail.scss";

import TransactionsPerson from "@/components/TransactionsPerson/TransactionsPerson";

const TransactionsDetail = () => {
  return (
    <div className="transactions__detail">
      <div className="transactions__detail__forMonth">
        <Image
          src="/assets/transactions/up.png"
          alt="calendar"
          width={32}
          height={32}
          className="transactions__detail__forMonth__icon"
        />
        <div className="transactions__detail__forMonth__content">
          <div className="transactions__detail__forMonth__content__title">
            Payment this month
          </div>
          <div className="transactions__detail__forMonth__content__result">
            <div className="transactions__detail__forMonth__content__result__number">
              10
            </div>
            <div className="transactions__detail__forMonth__content__result__pers">
              +8%
            </div>
            <Image
              src="/assets/transactions/graph.png"
              alt="graph"
              width={90}
              height={45}
              className="transactions__detail__forMonth__content__result__graph"
            />
          </div>
          <div className="transactions__detail__forMonth__content__persons">
            <div className="transactions__detail__forMonth__content__persons__list">
              {[1, 2, 3, 4, 5].map((order) => (
                <TransactionsPerson key={order} order={order} />
              ))}
            </div>
            <button className="transactions__detail__forMonth__content__persons__btn">
              See all
            </button>
          </div>
        </div>
      </div>
      <div className="transactions__detail__divider" />
      <div className="transactions__detail__balance">
        <Image
          src="/assets/transactions/balance.png"
          alt="balance"
          width={32}
          height={32}
          className="transactions__detail__balance__icon"
        />
        <div className="transactions__detail__balance__content">
          <div className="transactions__detail__balance__content__title">
            Total Payroll Balance
          </div>
          <div className="transactions__detail__balance__content__number">
            $2,325<span>.50</span>
          </div>
          <div className="transactions__detail__balance__content__annual">
            <div className="transactions__detail__balance__content__annual__title">
              Annual TPV
            </div>
            <Image
              src="/assets/transactions/increase.png"
              alt="increase"
              width={30}
              height={30}
              className="transactions__detail__balance__content__annual__icon"
            />
            <div className="transactions__detail__balance__content__annual__number">
              $800<span>.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsDetail;
