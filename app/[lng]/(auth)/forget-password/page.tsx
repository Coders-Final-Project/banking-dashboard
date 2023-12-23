"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import axios from "axios";

import { useRouter } from "next/navigation";

import "@/sass/pages/_forgetPassword.scss";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ForgetPassword = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const { email, password, confirmPassword } = formValues;

  useEffect(() => {
    if (serverError !== "" || success !== "") {
      setTimeout(() => {
        setServerError("");
        setSuccess("");
      }, 1000);
    }
  }, [serverError, success]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formValues;

    if (!email || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      setServerError("Passwords don't match!");
      return;
    }

    try {
      setSending(true);

      const response = await axios.post("/api/user/password/forget", {
        formValues,
      });

      if (response.data.status === 400) {
        setServerError(response.data.message);
      } else {
        setSuccess(response.data.message);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error: any) {
      setServerError(error.response.data.message);
    } finally {
      setSending(false);
      setFormValues(initialValues);
    }
  };

  return (
    <section className="forget__password">
      <form className="forget__password__form" onSubmit={handleSubmit}>
        <div className="forget__password__form__header">
          <Link href="/signin" className="forget__password__form__header__link">
            <Image
              src="/assets/sign/back.png"
              alt="back"
              width={20}
              height={20}
              className="forget__password__img"
            />
          </Link>
          <div className="forget__password__form__header__title">
            Update Password
          </div>
        </div>
        <div className="forget__password__form__item">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="forget__password__input"
            autoComplete="off"
          />
        </div>
        <div className="forget__password__form__item">
          <label htmlFor="pass">New Password</label>
          <input
            type="password"
            id="pass"
            name="password"
            value={password}
            onChange={handleChange}
            className="forget__password__input"
            autoComplete="off"
          />
        </div>
        <div className="forget__password__form__item">
          <label htmlFor="confirmPass">Confirm Password</label>
          <input
            type="password"
            id="confirmPass"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="forget__password__input"
            autoComplete="off"
          />
        </div>
        <button
          className={`forget__password__btn ${
            formValues.email &&
            formValues.password &&
            formValues.confirmPassword &&
            !sending &&
            "active"
          }`}
          disabled={
            formValues.email === "" ||
            formValues.password === "" ||
            formValues.confirmPassword === ""
          }
          type="submit"
        >
          {sending ? "Sending..." : "Update"}
        </button>
      </form>
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
      {success !== "" && (
        <div className="pop-up pop-up__success">
          <h2 className="pop-up__text__success">{success}</h2>
        </div>
      )}
    </section>
  );
};

export default ForgetPassword;
