import Image from "next/image";

import "@/sass/components/_cardInfo.scss";

import { activeCard } from "@/db/card";

import { hideCardNumbers, checkActiveCard } from "@/helpers";
import { useSelector } from "react-redux";
import { StateProps } from "@/interface";

const CardInfo = () => {
  const userCard = useSelector((state: StateProps) => state.userCard);

  return (
    <div className="cards__detail__info">
      <div className="cards__detail__info__heading">
        <div className="cards__detail__info__heading__text">Card Info</div>
        <Image
          src="/assets/cards/dot.png"
          alt="dot"
          width={24}
          height={24}
          className="cards__detail__info__heading__icon"
        />
      </div>
      <div className="cards__detail__info__content">
        <div className="cards__detail__info__content__item">
          <div className="cards__detail__info__content__item__text">
            Card Number
          </div>
          <div className="cards__detail__info__content__item__value">
            {hideCardNumbers(userCard.cardNumber)}{" "}
            {!userCard.cardNumber && "1234"}
          </div>
        </div>
        <div className="cards__detail__info__content__item">
          <div className="cards__detail__info__content__item__text">
            Balance
          </div>
          <div className="cards__detail__info__content__item__value">
            {userCard.balance !== 0 ? userCard.balance : "0,000"} ₼
          </div>
        </div>
        <div className="cards__detail__info__content__item">
          <div className="cards__detail__info__content__item__text">
            Currency
          </div>
          <div className="cards__detail__info__content__item__value">
            {/* {activeCard.currency} */}
            AZN
          </div>
        </div>
        <div className="cards__detail__info__content__item">
          <div className="cards__detail__info__content__item__text">
            Status Card
          </div>
          <div className="cards__detail__info__content__item__value">
            {userCard.endDate !== "" ? userCard.endDate : "04/03"}{" "}
            <span>({checkActiveCard(activeCard.statusCard)})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
