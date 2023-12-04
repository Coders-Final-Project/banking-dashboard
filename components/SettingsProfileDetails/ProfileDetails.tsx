"use client";

import { useState, useEffect } from "react";

import { useGlobalContext } from "@/context/store";

import axios from "axios";

import "@/sass/components/_profileDetails.scss";

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
      const response = await axios.post("/api/user/info", {
        userValues: userValues,
        userID: data._id,
      });

      if (response.data.success) {
        setSuccess(response.data.message);

        updateUserProfile(userValues);
      } else {
        setServerError("Something went wrong!");
      }
    } catch (error: any) {
      setServerError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="profile__details">
      <div className="profile__details__item">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder={data.firstName + " " + data.lastName}
          disabled
        />
      </div>
      <div className="profile__details__item">
        <label htmlFor="date">Date of Birth</label>
        <input
          type="date"
          id="date"
          value={userValues.dateOfBirth}
          onChange={(e) => handleUserValues(e)}
          name="dateOfBirth"
        />
      </div>
      <div className="profile__details__item">
        <label htmlFor="citizen">Citizen of</label>
        <select id="citizen" value="Azerbaijan" disabled>
          <option value="Azerbaijan">Azerbaijan</option>
        </select>
      </div>
      <div className="profile__details__item">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="phone"
          id="phone"
          placeholder="276-655-6598"
          name="phone"
          value={userValues.phone}
          onChange={(e) => handleUserValues(e)}
        />
      </div>
      <div className="profile__details__sidebyside">
        <div className="profile__details__sidebyside__item">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            placeholder="Individual"
            name="street"
            value={userValues.street}
            onChange={(e) => handleUserValues(e)}
          />
        </div>
        <div className="profile__details__sidebyside__item">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Individual"
            name="city"
            value={userValues.city}
            onChange={(e) => handleUserValues(e)}
          />
        </div>
      </div>
      <div className="profile__details__sidebyside">
        <div className="profile__details__sidebyside__item">
          <label htmlFor="zip">ZIP Code</label>
          <input
            type="text"
            id="zip"
            placeholder="Individual"
            name="zipCode"
            value={userValues.zipCode}
            onChange={(e) => handleUserValues(e)}
          />
        </div>
        <div className="profile__details__sidebyside__item">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="United States"
            name="country"
            value={userValues.country}
            onChange={(e) => handleUserValues(e)}
          />
        </div>
      </div>
      <button className="profile__details__btn" onClick={handleSave}>
        Save Changes
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
