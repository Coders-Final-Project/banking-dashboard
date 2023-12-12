"use client";

import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import { useRouter } from "next/navigation";

import { useState, useEffect, useRef } from "react";

import "@/sass/pages/_signUp.scss";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  job: "",
};

const SignUp = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [formValues, setFormValues] = useState(initialValues);
  const [privacyAgree, serPrivacyAgree] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
    if (serverError !== "") {
      setTimeout(() => {
        setServerError("");
      }, 1000);
    }
  }, [success, error, serverError]);

  const handlePasswordHide = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [target.name]: target.value,
    }));
  };

  const handlePrivacy = () => {
    serPrivacyAgree(!privacyAgree);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, password, job } = formValues;

    if (!firstName || !lastName || !email || !phone || !password || !job) {
      setError(true);
      return;
    }

    try {
      setSending(true);

      const response = await axios.post("/api/user/signup", formValues);

      if (response.data.status === 400) {
        setServerError(response.data.message);
      } else {
        setSuccess(true);
        router.push("/signin");
        setFormValues(initialValues);
      }
    } catch (error: any) {
      setServerError(error.message);
      setFormValues(initialValues);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="signup">
      <div className="signup__info">
        <div className="signup__info__title">Ready, Set, Go!</div>
        <div className="signup__info__desc">
          Say hello to ultimate card management! Imagine effortlessly organizing
          all your card info in one place. No more juggling, just joy! 🚀
        </div>
      </div>
      <form className="signup__form" onSubmit={handleSubmit}>
        <div className="signup__form__title">Sign up now</div>
        <div className="signup__form__content">
          <div className="signup__form__content__namePart">
            <div className="signup__form__content__namePart__item">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                id="firstname"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                className="signup__input"
              />
            </div>
            <div className="signup__form__content__namePart__item">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                id="lastname"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                className="signup__input"
              />
            </div>
          </div>
          <div className="signup__form__content__item">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="signup__input"
            />
          </div>
          <div className="signup__form__content__item">
            <label htmlFor="job">Your job</label>
            <input
              type="text"
              id="job"
              name="job"
              value={formValues.job}
              onChange={handleChange}
              className="signup__input"
            />
          </div>
          <div className="signup__form__content__item">
            <label htmlFor="phone">Phone number</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              className="signup__input"
            />
          </div>
          <div className="signup__form__content__item">
            <div className="signup__form__content__item__passwordLabel">
              <label htmlFor="password">Password</label>
              <button className="toggle__password" onClick={handlePasswordHide}>
                <Image
                  src={`/assets/sign/${
                    passwordType === "password" ? "hide" : "see"
                  }.png`}
                  alt="hide"
                  width={passwordType === "password" ? 19 : 24}
                  height={passwordType === "password" ? 15 : 24}
                  className="toggle__password__img"
                />
                <p className="toggle__password__text">Hide</p>
              </button>
            </div>
            <input
              type={passwordType}
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="signup__input"
            />
            <p>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          </div>
        </div>
        <div className="signup__form__privacy">
          <div className="signup__form__privacy__item">
            <input type="checkbox" id="terms" onChange={handlePrivacy} />
            <label htmlFor="terms">
              I agree to our{" "}
              <Link href="#" className="link">
                Terms of use
              </Link>{" "}
              and{" "}
              <Link href="#" className="link">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
        </div>
        <div className="signup__form__btns">
          <button
            className={`signup__form__btns__submit ${
              privacyAgree && !sending && "active"
            }`}
            disabled={sending || !privacyAgree}
            type="submit"
          >
            {sending ? "Sending..." : "Sign Up"}
          </button>
          <p>
            Already have an ccount?{" "}
            <Link href="/signin" className="singup__switch">
              Log in
            </Link>
          </p>
        </div>
      </form>
      {success && (
        <div className="pop-up pop-up__success">
          <h2 className="pop-up__text__success">Successfully Signed Up!</h2>
        </div>
      )}
      {error && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">Please, fill all the fields!</h2>
        </div>
      )}
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
    </section>
  );
};

export default SignUp;
