"use client";

import { useState, useEffect } from "react";

import "@/sass/layout/_pageHeader.scss";
import "@/sass/pages/_contact.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

import { definedContactSubjects } from "@/constants";

const INITIAL_VALUES = {
  user: "",
  subject: "Account Inquiry",
  mail: "",
  message: "",
};

const Contact = () => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
    }
  }, [success, errorAlert]);

  const { user, subject, mail, message } = formValues;

  const handleChange = (target: { name: string; value: string }) => {
    setFormValues((prevValues) => {
      return {
        ...prevValues,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormValues(INITIAL_VALUES);
  };

  return (
    <main className="contact">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Contact</div>
        </div>
        <AvatarDetail />
      </header>
      <div className="contact__body">
        <div className="contact__body__title">Contact Us</div>
        <form className="contact__body__form" onSubmit={handleSubmit}>
          <div className="contact__body__form__item">
            <label htmlFor="user">Name and surname</label>
            <input
              type="text"
              id="user"
              name="user"
              value={user}
              onChange={(e) => handleChange(e.target)}
              placeholder="John Doe"
              autoComplete="off"
            />
          </div>
          <div className="contact__body__form__item">
            <label htmlFor="subject">Subject</label>
            <select
              name="subject"
              id="subject"
              autoComplete="off"
              value={subject}
              onChange={(e) => handleChange(e.target)}
            >
              {definedContactSubjects.map((subject) => (
                <option value={subject} key={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="contact__body__form__item">
            <label htmlFor="mail">Email</label>
            <input
              type="email"
              id="mail"
              name="mail"
              value={mail}
              onChange={(e) => handleChange(e.target)}
              placeholder="john@gmail.com"
              autoComplete="off"
            />
          </div>
          <div className="contact__body__form__item">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => handleChange(e.target)}
              placeholder="Type here..."
              autoComplete="off"
            ></textarea>
          </div>
          <button className="contact__body__form__btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      {success && <div className="contact__alert--success">Message Sent!</div>}
      {errorAlert !== "" && (
        <div className="contact__alert--error">{errorAlert}</div>
      )}
    </main>
  );
};

export default Contact;
