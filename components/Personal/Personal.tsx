"use client";

import React from "react";
import "@/sass/components/_personal.scss";

const Personal = () => {
  return (
    <div className="personal">
      <div className="personal__contractorType">
        <p>Contractor type</p>

        <div className="personal__choosing">
          <form action="">
            <div>
              <input type="radio" />
              <label>Set up as an individual</label>
            </div>
            <div>
              <input type="radio" />
              <label>Set up as an entity</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Personal;
