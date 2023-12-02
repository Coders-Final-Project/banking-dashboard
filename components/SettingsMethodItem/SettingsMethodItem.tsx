import Image from "next/image";

import "@/sass/components/_settingsMethodItem.scss";

interface IProps {
  title: string;
  connect: string;
  icon: string;
}

const SettingsMethodItem = ({ title, connect, icon }: IProps) => {
  return (
    <div className="withdrawal__methods__content__item">
      <Image
        src={icon}
        alt="method"
        width={46}
        height={46}
        className="withdrawal__methods__content__item__icon"
      />
      <div className="withdrawal__methods__content__item__info">
        <div className="withdrawal__methods__content__item__info__name">
          {title}
        </div>
        <div className="withdrawal__methods__content__item__info__case">
          {connect}
        </div>
      </div>
      {connect === "Verified" && (
        <div className="withdrawal__methods__content__item__btn verified">
          <Image
            src="/assets/settings/connect.png"
            alt="connect"
            width={20}
            height={20}
            className="withdrawal__methods__content__item__btn__icon"
          />
          Connected
        </div>
      )}
      {connect === "Connect" && (
        <div className="withdrawal__methods__content__item__btn">
          Connect Account
        </div>
      )}
    </div>
  );
};

export default SettingsMethodItem;
