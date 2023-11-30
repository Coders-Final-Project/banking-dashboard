"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Image from "next/image";

import ReCAPTCHA from "react-google-recaptcha";

import "@/sass/pages/_signIn.scss";
import Link from "next/link";

import { useRouter } from "next/navigation";

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [formValues, setFormValues] = useState(initialValues);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [captcha, setCaptcha] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (serverError !== "") {
      setTimeout(() => {
        setServerError("");
      }, 1000);
    }
  }, [serverError]);

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

  const handleRecaptcha = () => {
    setCaptcha((prevValue) => {
      return !prevValue;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formValues;

    if (!email || !password) {
      return;
    }

    try {
      setSending(true);
      const response = await axios.post("/api/user/signin", formValues);
      console.log(response.data);
      router.push("/");
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setSending(false);
      setFormValues(initialValues);
    }
  };

  return (
    <section className="signIn">
      <form className="signIn__form" onSubmit={handleSubmit}>
        <div className="signIn__form__title">Log in</div>
        <div className="signIn__form__item">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
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
          <input
            type={passwordType}
            id="pass"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
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
        <div className="recaptcha">
          <ReCAPTCHA
            sitekey="6LcQAh8pAAAAAEIt6vw4NJOhoJYk9xFApwbv9vTm"
            onChange={handleRecaptcha}
          />
        </div>
        <button
          className={`signIn__form__btn ${
            formValues.email &&
            formValues.password &&
            captcha &&
            !sending &&
            "active"
          }`}
          disabled={!formValues.email || !formValues.password}
          type="submit"
        >
          {sending ? "Sending..." : "Log In"}
        </button>
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
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
    </section>
  );
};

export default SignIn;
