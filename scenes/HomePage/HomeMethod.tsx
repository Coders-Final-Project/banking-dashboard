import Image from "next/image";

import "@/sass/scenes/_homeMethod.scss";

import { useTranslation } from "@/i18n";

const HomeMethod = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng);

  return (
    <div className="home__content__method">
      <div className="home__content__method__withdraw">
        <div className="home__content__method__withdraw__text">
          {t("home.line1.title3")}
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
            {t("home.line1.method.case")}
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
          {t("home.line1.method.status")}
        </button>
      </div>
    </div>
  );
};

export default HomeMethod;
