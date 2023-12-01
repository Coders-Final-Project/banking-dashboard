"use client";

import React, { useState } from "react";

import Image from "next/image";

import "@/sass/layout/_pageHeader.scss";
import "@/sass/pages/_settings.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

const Settings = () => {
  const [activeBtn, setActiveBtn] = useState("personal");

  const handleActiveBtn = (e: any) => {
    setActiveBtn(e.target.value);
  };

  return (
    <main className="settings">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Settings</div>
        </div>
        <AvatarDetail />
      </header>
      <div className="settings__content">
        <div className="settings__content__btns">
          <button
            className={`settings__content__btns__btn ${
              activeBtn === "personal" && "active"
            }`}
            value="personal"
            onClick={(e) => handleActiveBtn(e)}
          >
            Personal
          </button>
          <button
            className={`settings__content__btns__btn ${
              activeBtn === "withdraw" && "active"
            }`}
            value="withdraw"
            onClick={(e) => handleActiveBtn(e)}
          >
            Withdrawal Methods
          </button>
        </div>
        <div className="settings__content__info">
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
        </div>
      </div>
    </main>
  );
};

export default Settings;
