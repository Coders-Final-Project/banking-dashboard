import Image from "next/image";

import "@/sass/components/_cardActionItem.scss";

import { defineCompanyImage, getFormattedDate } from "@/helpers";

import { IContractual } from "@/interface";

const CardActionItem = ({
  company,
  projectName,
  createdAt,
  rate,
}: IContractual) => {
  const { formattedDate } = getFormattedDate(createdAt);

  return (
    <div className="cards__action__item">
      <div className="cards__action__item__preview">
        <Image
          src={`/assets/contracts/${defineCompanyImage(company)}`}
          alt={projectName}
          width={50}
          height={50}
          className="cards__action__item__preview__icon"
        />
        <div className="cards__action__item__preview__text">{projectName}</div>
      </div>
      <div className="cards__action__item__date">{formattedDate}</div>
      <div className="cards__action__item__amount">{rate}₼</div>
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
