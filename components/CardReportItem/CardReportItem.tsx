import Image from "next/image";

import "@/sass/components/_cardReportItem.scss";

interface IProps {
  imgUrlEnd: string;
  text: string;
}

const CardReportItem = ({ imgUrlEnd, text }: IProps) => {
  return (
    <div className="cards__detail__report__content__item">
      <Image
        src={`/assets/cards/${imgUrlEnd}`}
        alt={text}
        width={40}
        height={40}
        className="cards__detail__report__content__item__img"
      />
      <div className="cards__detail__report__content__item__text">{text}</div>
      <Image
        src="/assets/cards/right-arrow.png"
        alt="arrow"
        width={24}
        height={24}
        className="cards__detail__report__content__item__icon"
      />
    </div>
  );
};

export default CardReportItem;
