"use client";

import { useState, useEffect } from "react";

import { useGlobalContext } from "@/context/store";

import axios from "axios";

import "@/sass/components/_profileDetails.scss";

import { useSelector } from "react-redux";
import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const ProfileDetails = () => {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const { data, updateUserProfile } = useGlobalContext();

  const INITIAL_USER_VALUES = {
    dateOfBirth: data.dateOfBirth ? data.dateOfBirth : "",
    phone: data.phone ? data.phone : "",
    street: data.street ? data.street : "",
    city: data.city ? data.city : "",
    zipCode: data.zipCode ? data.zipCode : "",
    country: data.country ? data.country : "",
  };

  const [userValues, setUserValues] = useState(INITIAL_USER_VALUES);

  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

  useEffect(() => {
    const transformedDate = userValues.dateOfBirth
      ? userValues.dateOfBirth.split("T")[0]
      : "";

    setUserValues((prevValues) => ({
      ...prevValues,
      dateOfBirth: transformedDate,
    }));

    if (serverError !== "" || success !== "") {
      setTimeout(() => {
        setServerError("");
        setSuccess("");
      }, 2000);
    }
  }, [serverError, success, userValues.dateOfBirth]);

  const handleUserValues = (e: any) => {
    setUserValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "/api/user/info",
        {
          userValues: userValues,
          userID: data._id,
        },
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      );

      if (response.data.success) {
        setSuccess(response.data.message);

        updateUserProfile(userValues);
      } else {
        setServerError(`${t("settings.details.field1")}`);
      }
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  return (
    <div className="profile__details">
      <div className="profile__details__item">
        <label htmlFor="name">{t("settings.details.field1")}</label>
        <input
          type="text"
          id="name"
          placeholder={data.firstName + " " + data.lastName}
          disabled
          name="person"
          autoComplete="off"
        />
      </div>
      <div className="profile__details__item">
        <label htmlFor="date">{t("settings.details.field2")}</label>
        <input
          type="date"
          id="date"
          value={userValues.dateOfBirth}
          onChange={(e) => handleUserValues(e)}
          name="dateOfBirth"
          autoComplete="off"
        />
      </div>
      <div className="profile__details__item">
        <label htmlFor="citizen">{t("settings.details.field3")}</label>
        <select
          id="citizen"
          value="Azerbaijan"
          disabled
          name="country"
          autoComplete="off"
        >
          <option value="Azerbaijan">Azerbaijan</option>
        </select>
      </div>
      <div className="profile__details__item">
        <label htmlFor="phone">{t("settings.details.field4")}</label>
        <input
          type="phone"
          id="phone"
          placeholder="276-655-6598"
          name="phone"
          value={userValues.phone}
          onChange={(e) => handleUserValues(e)}
          autoComplete="off"
        />
      </div>
      <div className="profile__details__sidebyside">
        <div className="profile__details__sidebyside__item">
          <label htmlFor="street">{t("settings.details.field5")}</label>
          <input
            type="text"
            id="street"
            placeholder="Individual"
            name="street"
            value={userValues.street}
            onChange={(e) => handleUserValues(e)}
            autoComplete="off"
          />
        </div>
        <div className="profile__details__sidebyside__item">
          <label htmlFor="city">{t("settings.details.field6")}</label>
          <input
            type="text"
            id="city"
            placeholder="Individual"
            name="city"
            value={userValues.city}
            onChange={(e) => handleUserValues(e)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="profile__details__sidebyside">
        <div className="profile__details__sidebyside__item">
          <label htmlFor="zip">{t("settings.details.field7")}</label>
          <input
            type="text"
            id="zip"
            placeholder="Individual"
            name="zipCode"
            value={userValues.zipCode}
            onChange={(e) => handleUserValues(e)}
            autoComplete="off"
          />
        </div>
        <div className="profile__details__sidebyside__item">
          <label htmlFor="country">{t("settings.details.field8")}</label>
          <input
            type="text"
            id="country"
            placeholder="United States"
            name="country"
            value={userValues.country}
            onChange={(e) => handleUserValues(e)}
            autoComplete="off"
          />
        </div>
      </div>
      <button className="profile__details__btn" onClick={handleSave}>
        {t("settings.details.btn")}
      </button>
      {success !== "" && (
        <div className="profile__details__alert--success">{success}</div>
      )}
      {serverError !== "" && (
        <div className="profile__details__alert--error">{serverError}</div>
      )}
    </div>
  );
};

export default ProfileDetails;
