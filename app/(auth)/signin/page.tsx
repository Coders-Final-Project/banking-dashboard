"use client";

import { useState } from "react";

import Image from "next/image";

import "@/sass/pages/_signIn.scss";
import Link from "next/link";

const SignIn = () => {
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
    <section className="signIn">
      <form className="signIn__form">
        <div className="signIn__form__title">Log in</div>
        <div className="signIn__form__item">
          <label htmlFor="key">Email address or user name</label>
          <input type="text" id="key" />
        </div>
        <div className="signIn__form__item">
          <div className="signIn__form__item__passwordLabel">
            <label htmlFor="pass">Password</label>
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
          <input type={passwordType} id="pass" />
          <div className="remember__me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
        </div>
        <div className="signIn__form__privacy">
          By continuing, you agree to the{" "}
          <Link href="#" className="link">
            Terms of use
          </Link>{" "}
          and{" "}
          <Link href="#" className="link">
            Privacy Policy
          </Link>
          .
        </div>
        <button className="signIn__form__btn">Log in</button>
        <Link href="#" className="signIn__form__forgetPass">
          Forget your password
        </Link>
        <div className="signIn__form__switch">
          Do not have an acount?{" "}
          <Link href="/signup" className="singin__switch">
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
