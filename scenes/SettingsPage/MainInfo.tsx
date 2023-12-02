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

const MainInfo = () => {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordValues, setPasswordValues] = useState(INITIAL_PASS_VALUES);

  const { data } = useGlobalContext();

  useEffect(() => {
    if (success || serverError) {
      setTimeout(() => {
        setSuccess(false);
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
          currenctPass: passwordValues.currentPass,
          newPass: passwordValues.newPass,
        });

        setSuccess(true);
      } else {
        setServerError("Passwords dont match!");
      }
    } catch (error: any) {
      setServerError(error.response.data.message);
    } finally {
      setPasswordValues(INITIAL_PASS_VALUES);
    }
  };

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
          <button
            className="settings__content__info__main__box__parts__item"
            onClick={handleMailOpen}
          >
            <div className="settings__content__info__main__box__parts__item__text">
              Change email address
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
                <label htmlFor="old">Current Email</label>
                <input type="email" id="old" />
              </div>
              <div className="mail__change__item">
                <label htmlFor="new">New Email</label>
                <input type="email" id="new" />
              </div>
              <button className="password__change__btn">Save</button>
            </div>
          )}
          <button
            className="settings__content__info__main__box__parts__item"
            onClick={handlePassOpen}
          >
            <div className="settings__content__info__main__box__parts__item__text">
              Change password
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
                <label htmlFor="currentPass">Currenct Password</label>
                <input
                  type="password"
                  id="currentPass"
                  name="currentPass"
                  value={passwordValues.currentPass}
                  onChange={(e) => handlePasswordValues(e)}
                />
              </div>
              <div className="password__change__item">
                <label htmlFor="newPass">New Password</label>
                <input
                  type="password"
                  id="newPass"
                  name="newPass"
                  value={passwordValues.newPass}
                  onChange={(e) => handlePasswordValues(e)}
                />
              </div>
              <div className="password__change__item">
                <label htmlFor="confirmNewPass">Confirm Password</label>
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
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      {success && (
        <div className="settings__alert--success">Password Changed!</div>
      )}
      {serverError !== "" && (
        <div className="settings__alert--error">{serverError}</div>
      )}
    </div>
  );
};

export default MainInfo;
