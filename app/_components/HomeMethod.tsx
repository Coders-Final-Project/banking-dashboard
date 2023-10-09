import Image from "next/image";

import "@/sass/components/_homeMethod.scss";

const HomeMethod = () => {
  return (
    <div className="home__content__method">
      <div className="home__content__method__withdraw">
        <div className="home__content__method__withdraw__text">
          Withdraw Method
        </div>
        <Image
          src="/assets/home/dot.png"
          alt="payment"
          width={24}
          height={24}
          className="home__content__method__withdraw__icon"
        />
      </div>
      <div className="home__content__method__info">
        <Image
          src="/assets/home/paypal.png"
          alt="method"
          width={48}
          height={48}
          className="home__content__method__info__icon"
        />
        <div className="home__content__method__info__text">
          <div className="home__content__method__info__text__name">PayPal</div>
          <div className="home__content__method__info__text__case">
            Verified
          </div>
        </div>
        <button className="home__content__method__info__btn">
          <Image
            src="/assets/home/connected.png"
            alt="connected"
            width={20}
            height={20}
            className="home__content__method__info__btn__icon"
          />
          Connected
        </button>
      </div>
    </div>
  );
};

export default HomeMethod;
