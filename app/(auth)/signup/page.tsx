"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import "@/sass/pages/_signUp.scss";

const SignUp = () => {
  const [passwordType, setPasswordType] = useState("password");

  const handlePasswordHide = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
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
      <form className="signup__form">
        <div className="signup__form__title">Sign up now</div>
        <div className="signup__form__content">
          <div className="signup__form__content__namePart">
            <div className="signup__form__content__namePart__item">
              <label htmlFor="firstname">First name</label>
              <input type="text" id="firstname" />
            </div>
            <div className="signup__form__content__namePart__item">
              <label htmlFor="lastname">Last name</label>
              <input type="text" id="lastname" />
            </div>
          </div>
          <div className="signup__form__content__item">
            <label htmlFor="email">Email address</label>
            <input type="mail" id="email" />
          </div>
          <div className="signup__form__content__item">
            <label htmlFor="phone">Phone number</label>
            <input type="phone" id="phone" />
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
            <input type={passwordType} id="password" />
            <p>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          </div>
        </div>
        <div className="signup__form__privacy">
          <div className="signup__form__privacy__item">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              By creating an account, I agree to our Terms of use and Privacy
              Policy.
            </label>
          </div>
          <div className="signup__form__privacy__item">
            <input type="checkbox" id="adds" />
            <label htmlFor="adds">
              By creating an account, I am also consenting to receive SMS
              messages and emails, including product new feature updates,
              events, and marketing promotions.
            </label>
          </div>
        </div>
        <div className="signup__form__btns">
          <button className="signup__form__btns__submit">Sign up</button>
          <p>
            Already have an ccount?{" "}
            <Link href="/signin" className="singup__switch">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
