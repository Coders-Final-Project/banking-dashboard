"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import Image from "next/image";

import { useGlobalContext } from "@/context/store";

import "@/sass/scenes/_mainInfo.scss";

const INITIAL_PASS_VALUES = {
  currentPass: "",
  newPass: "",
  confirmNewPass: "",
};

const INITIAL_MAIL_VALUES = {
  currentMail: "",
  newMail: "",
};

import { useSelector } from "react-redux";
import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const MainInfo = () => {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordValues, setPasswordValues] = useState(INITIAL_PASS_VALUES);
  const [mailValues, setMailValues] = useState(INITIAL_MAIL_VALUES);

  const { data } = useGlobalContext();

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  useEffect(() => {
    if (success || serverError) {
      setTimeout(() => {
        setSuccess("");
      }, 2000);

      setTimeout(() => {
        setServerError("");
      }, 2000);
    }
  }, [success, serverError]);

  const handlePasswordValues = (e: any) => {
    setPasswordValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleMailValues = (e: any) => {
    setMailValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePassOpen = () => {
    setIsPassOpen((prevValue) => !prevValue);
  };

  const handleMailOpen = () => {
    setIsMailOpen((prevValues) => !prevValues);
  };

  const handlePassSubmit = async () => {
    try {
      if (
        data._id &&
        passwordValues.newPass !== "" &&
        passwordValues.confirmNewPass !== "" &&
        passwordValues.currentPass !== "" &&
        passwordValues.newPass === passwordValues.confirmNewPass
      ) {
        const response = await axios.post("/api/user/password", {
          userID: data._id,
          currentPass: passwordValues.currentPass,
          newPass: passwordValues.newPass,
        });

        if (response.data.success) {
          setSuccess(response.data.message);
        } else {
          console.log(response.data.message);
          setServerError(response.data.message);
        }
      } else {
        setServerError(`${t("settings.login.change.error1")}`);
      }
    } catch (error: any) {
      setServerError(error.response.data.message);
    } finally {
      setPasswordValues(INITIAL_PASS_VALUES);
    }
  };

  const handleMailSubmit = async () => {
    try {
      if (
        data._id &&
        mailValues.newMail !== "" &&
        mailValues.currentMail !== "" &&
        mailValues.currentMail !== mailValues.newMail
      ) {
        const response = await axios.post("/api/user/mail", {
          userID: data._id,
          currentMail: mailValues.currentMail,
          newMail: mailValues.newMail,
        });

        if (response.data.success) {
          setSuccess(response.data.message);
        } else {
          setServerError(response.data.message);
        }

        setSuccess(response.data.message);
      } else {
        setServerError(`${t("settings.login.change.error2")}`);
      }
    } catch (error: any) {
      setServerError(error.response.data.message);
    } finally {
      setMailValues(INITIAL_MAIL_VALUES);
    }
  };

  return (
    <div className="settings__content__info__main">
      <div className="settings__content__info__main__box">
        <div className="settings__content__info__main__box__title">
          {t("settings.contract")}
        </div>
        <div className="settings__content__info__main__box__body">
          <div className="settings__content__info__main__box__body__item">
            <input type="radio" id="individual" name="option" defaultChecked />
            <label htmlFor="individual">{t("settings.contractType1")}</label>
          </div>
          <div className="settings__content__info__main__box__body__item">
            <input type="radio" id="entity" name="option" />
            <label htmlFor="entity">{t("settings.contractType2")}</label>
          </div>
        </div>
      </div>
      <div className="settings__content__info__main__box">
        <div className="settings__content__info__main__box__title">
          {t("settings.login.title")}
        </div>
        <div className="settings__content__info__main__box__parts">
          <button
            className="settings__content__info__main__box__parts__item"
            onClick={handleMailOpen}
          >
            <div className="settings__content__info__main__box__parts__item__text">
              {t("settings.login.change1")}
            </div>
            <Image
              src={`/assets/settings/${
                isMailOpen ? "down-arrow" : "switch"
              }.png`}
              alt="switch"
              width={24}
              height={24}
            />
          </button>
          {isMailOpen && (
            <div className="mail__change">
              <div className="mail__change__item">
                <label htmlFor="old">
                  {t("settings.login.change1.field1")}
                </label>
                <input
                  type="email"
                  id="old"
                  name="currentMail"
                  value={mailValues.currentMail}
                  onChange={(e) => handleMailValues(e)}
                />
              </div>
              <div className="mail__change__item">
                <label htmlFor="new">
                  {t("settings.login.change1.field2")}
                </label>
                <input
                  type="email"
                  id="new"
                  name="newMail"
                  value={mailValues.newMail}
                  onChange={(e) => handleMailValues(e)}
                />
              </div>
              <button
                className="password__change__btn"
                onClick={handleMailSubmit}
              >
                {t("settings.login.change1.btn")}
              </button>
            </div>
          )}
          <button
            className="settings__content__info__main__box__parts__item"
            onClick={handlePassOpen}
          >
            <div className="settings__content__info__main__box__parts__item__text">
              {t("settings.login.change2")}
            </div>
            <Image
              src={`/assets/settings/${
                isPassOpen ? "down-arrow" : "switch"
              }.png`}
              alt="switch"
              width={24}
              height={24}
            />
          </button>
          {isPassOpen && (
            <div className="password__change">
              <div className="password__change__item">
                <label htmlFor="currentPass">
                  {t("settings.login.change2.field1")}
                </label>
                <input
                  type="password"
                  id="currentPass"
                  name="currentPass"
                  value={passwordValues.currentPass}
                  onChange={(e) => handlePasswordValues(e)}
                />
              </div>
              <div className="password__change__item">
                <label htmlFor="newPass">
                  {t("settings.login.change2.field2")}
                </label>
                <input
                  type="password"
                  id="newPass"
                  name="newPass"
                  value={passwordValues.newPass}
                  onChange={(e) => handlePasswordValues(e)}
                />
              </div>
              <div className="password__change__item">
                <label htmlFor="confirmNewPass">
                  {t("settings.login.change2.field3")}
                </label>
                <input
                  type="password"
                  id="confirmNewPass"
                  name="confirmNewPass"
                  value={passwordValues.confirmNewPass}
                  onChange={(e) => handlePasswordValues(e)}
                />
              </div>
              <button
                className="password__change__btn"
                onClick={handlePassSubmit}
              >
                {t("settings.login.change2.btn")}
              </button>
            </div>
          )}
        </div>
      </div>
      {success !== "" && (
        <div className="settings__alert--success">{success}</div>
      )}
      {serverError !== "" && (
        <div className="settings__alert--error">{serverError}</div>
      )}
    </div>
  );
};

export default MainInfo;
