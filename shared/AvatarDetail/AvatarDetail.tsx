import Image from "next/image";

import "@/sass/layout/_avatarDetail.scss";

import Button from "@/components/Button/Button";

interface Props {
  id: number;
  name: string;
  position: string;
  imgUrl: string;
  hasBtn?: boolean;
}

const AvatarDetail = ({ name, position, imgUrl, hasBtn }: Props) => {
  return (
    <div className="avatar__detail">
      {hasBtn && (
        <Button
          text="create a contract"
          icon="frame.png"
          url="/contracts/create"
        />
      )}
      <Image
        src="/assets/home/notification.png"
        alt="notification"
        width={24}
        height={24}
        className="avatar__detail__notify"
      />
      <div className="avatar__detail__person">
        <Image
          src={`/assets/home/${imgUrl}`}
          alt={name}
          width={40}
          height={40}
          className="avatar__detail__person__img"
        />
        <div className="avatar__detail__person__info">
          <div className="avatar__detail__person__info__name">{name}</div>
          <div className="avatar__detail__person__info__position">
            {position}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDetail;
