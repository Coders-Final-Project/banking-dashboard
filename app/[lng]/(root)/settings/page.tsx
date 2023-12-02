"use client";

import React, { useState } from "react";

import "@/sass/layout/_pageHeader.scss";
import "@/sass/pages/_settings.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import MainInfo from "@/scenes/SettingsPage/MainInfo";
import ProfileInfo from "@/scenes/SettingsPage/ProfileInfo";
import Withdrawal from "@/scenes/SettingsPage/Withdrawal";
import Verification from "@/scenes/SettingsPage/Verification";

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
          <button
            className={`settings__content__btns__btn ${
              activeBtn === "verify" && "active"
            }`}
            value="verify"
            onClick={(e) => handleActiveBtn(e)}
          >
            Verification
          </button>
        </div>
        <div className="settings__content__info">
          {activeBtn === "personal" && (
            <>
              <MainInfo />
              <ProfileInfo />
            </>
          )}
          {activeBtn === "withdraw" && <Withdrawal />}
          {activeBtn === "verify" && <Verification />}
        </div>
      </div>
    </main>
  );
};

export default Settings;
