import Image from "next/image";

import "@/sass/scenes/_mainInfo.scss";

const MainInfo = () => {
  return (
    <div className="settings__content__info__main">
      <div className="settings__content__info__main__box">
        <div className="settings__content__info__main__box__title">
          Contractor Type
        </div>
        <div className="settings__content__info__main__box__body">
          <div className="settings__content__info__main__box__body__item">
            <input type="radio" id="individual" name="option" />
            <label htmlFor="individual">Set up as an individual</label>
          </div>
          <div className="settings__content__info__main__box__body__item">
            <input type="radio" id="entity" name="option" />
            <label htmlFor="entity">Set up as an entity</label>
          </div>
        </div>
      </div>
      <div className="settings__content__info__main__box">
        <div className="settings__content__info__main__box__title">
          Login Details
        </div>
        <div className="settings__content__info__main__box__parts">
          <div className="settings__content__info__main__box__parts__item">
            <div className="settings__content__info__main__box__parts__item__text">
              Change email address
            </div>
            <Image
              src="/assets/settings/switch.png"
              alt="switch"
              width={24}
              height={24}
            />
          </div>
          <div className="settings__content__info__main__box__parts__item">
            <div className="settings__content__info__main__box__parts__item__text">
              Change password
            </div>
            <Image
              src="/assets/settings/switch.png"
              alt="switch"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
