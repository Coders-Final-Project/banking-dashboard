"use client";

import { useState, useEffect } from "react";

import "@/sass/layout/_pageHeader.scss";
import "@/sass/pages/_contact.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

import { definedContactSubjects } from "@/constants";

import { sendContactForm } from "@/lib/actions/sendContactForm";

import { emailRegex } from "@/lib/utils/mailRegex";

import { useTranslation } from "@/i18n/client";

const INITIAL_VALUES = {
  user: "",
  subject: "Account Inquiry",
  mail: "",
  message: "",
};

const Contact = ({ params: { lng } }: { params: { lng: string } }) => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(lng);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { user, mail, subject, message } = formValues;

    if (!user || !mail || !subject || !message) {
      setErrorAlert("Fill al the fields!");
      return;
    }

    if (!emailRegex.test(mail)) {
      setErrorAlert("Provide correct mail!");
      return;
    }

    setLoading(true);

    try {
      await sendContactForm(formValues);
      setSuccess(true);
    } catch (error: any) {
      setErrorAlert("Server error!");
    } finally {
      setFormValues(INITIAL_VALUES);
      setLoading(false);
    }
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
          <button
            className={`contact__body__form__btn ${loading && "disabled"}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
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
