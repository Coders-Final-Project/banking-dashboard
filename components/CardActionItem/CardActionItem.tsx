import Image from "next/image";

import "@/sass/components/_cardActionItem.scss";

interface IProps {
  name: string;
  iconUrl: string;
  date: string;
  amount: number;
}

const CardActionItem = ({ name, iconUrl, date, amount }: IProps) => {
  return (
    <div className="cards__action__item">
      <div className="cards__action__item__preview">
        <Image
          src={iconUrl}
          alt={name}
          width={50}
          height={50}
          className="cards__action__item__preview__icon"
        />
        <div className="cards__action__item__preview__text">{name}</div>
      </div>
      <div className="cards__action__item__date">{date}</div>
      <div className="cards__action__item__amount">-${amount}</div>
      <Image
        src="/assets/cards/right-arrow.png"
        alt="arrows"
        width={24}
        height={24}
        className="cards__action__item__switch"
      />
    </div>
  );
};

export default CardActionItem;
