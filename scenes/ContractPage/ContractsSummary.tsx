import Image from "next/image";

import "@/sass/scenes/_contractsSummary.scss";

const ContractsSummary = () => {
  return (
    <div className="contracts__content__summary">
      <div className="contracts__content__summary__data">
        <Image
          src="/assets/contracts/summary-icon.png"
          alt="icon"
          width={24}
          height={24}
          className="contracts__content__summary__data__icon"
        />
        <div className="contracts__content__summary__data__info">
          <div className="contracts__content__summary__data__info__title">
            Contact Created this month
          </div>
          <div className="contracts__content__summary__data__info__body">
            <div className="contracts__content__summary__data__info__body__number">
              $83
            </div>
            <div className="contracts__content__summary__data__info__body__perc">
              +8%
            </div>
          </div>
        </div>
      </div>
      <div className="contracts__content__summary__graph">
        <Image
          src="/assets/contracts/graph.png"
          alt="graph"
          width={88}
          height={44}
          className="contracts__content__summary__img"
        />
      </div>
    </div>
  );
};

export default ContractsSummary;
