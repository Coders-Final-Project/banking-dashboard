import React from "react";

import "@/sass/components/_profileDetails.scss";

const ProfileDetails = () => {
  return (
    <div className="profile__details">
      <div className="profile__details__item">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Ramon Meijers" />
      </div>
      <div className="profile__details__item">
        <label htmlFor="date">Date of Birth</label>
        <input type="date" id="date" />
      </div>
      <div className="profile__details__item">
        <label htmlFor="citizen">Citizen of</label>
        <select id="citizen">
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Turkey">Turkey</option>
        </select>
      </div>
      <div className="profile__details__item">
        <label htmlFor="phone">Phone Number</label>
        <input type="phone" id="phone" placeholder="276-655-6598" />
      </div>
      <div className="profile__details__sidebyside">
        <div className="profile__details__sidebyside__item">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" placeholder="Individual" />
        </div>
        <div className="profile__details__sidebyside__item">
          <label htmlFor="city">City</label>
          <input type="text" id="city" placeholder="Individualy" />
        </div>
      </div>
      <div className="profile__details__sidebyside">
        <div className="profile__details__sidebyside__item">
          <label htmlFor="zip">ZIP Code</label>
          <input type="text" id="zip" placeholder="Individual" />
        </div>
        <div className="profile__details__sidebyside__item">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" placeholder="United States" />
        </div>
      </div>

      <button className="profile__details__btn">Save Changes</button>
    </div>
  );
};

export default ProfileDetails;
