import Image from "next/image";

import "@/sass/scenes/_homeTotal.scss";

const HomeTotal = () => {
  return (
    <div className="home__content__total">
      <div className="home__content__total__item">
        <Image
          src="/assets/home/icon2.png"
          alt="icon"
          width={24}
          height={24}
          className="home__content__total__item__img"
        />
        <div className="home__content__total__item__info">
          <div className="home__content__total__item__info__text">
            Total Outstanding
          </div>
          <div className="home__content__total__item__info__number">
            $58,764<span>.25</span>
          </div>
        </div>
      </div>
      <div className="home__content__total__divider" />
      <div className="home__content__total__item">
        <Image
          src="/assets/home/icon1.png"
          alt="icon"
          width={24}
          height={24}
          className="home__content__total__item__img"
        />
        <div className="home__content__total__item__info">
          <div className="home__content__total__item__info__text">
            Upcoming Payment
          </div>
          <div className="home__content__total__item__info__number">
            April 1st, <span>2022</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTotal;
