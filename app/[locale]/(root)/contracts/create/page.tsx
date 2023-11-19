"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

import { useGlobalContext } from "@/context/store";

import { useMultiplestepForm } from "@/hooks/useMultiplestepForm";

import "@/sass/pages/_contractCreate.scss";

import ContractGeneral from "@/scenes/ContractForms/ContractGeneral";
import ContractPayment from "@/scenes/ContractForms/ContractPayment";
import ContractScope from "@/scenes/ContractForms/ContractScope";
import ContractSign from "@/scenes/ContractForms/ContractSign";

import { FormEvent } from "react";
import { FormData } from "@/interface";

import { createProgressBar } from "@/helpers";

const INITIAL_DATA: FormData = {
  client: "",
  company: "Pasha Bank",
  rate: "",
  projectName: "",
  currency: "AZN",
  date: "",
  workScope: "",
  cycleEnd: "Last day of the month",
  paymentDue: "Same Day",
  isSigned: false,
};

const ContractCreate = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const router = useRouter();

  const userData = useGlobalContext();

  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return {
        ...prev,
        ...fields,
      };
    });
  };

  const {
    step,
    currentStepIndex,
    steps,
    next,
    back,
    goTo,
    isFirstStep,
    isLastStep,
  } = useMultiplestepForm([
    <ContractGeneral {...data} updateFields={updateFields} key={1} />,
    <ContractScope {...data} updateFields={updateFields} key={2} />,
    <ContractPayment {...data} updateFields={updateFields} key={3} />,
    <ContractSign
      {...data}
      updateFields={updateFields}
      successAlert={successAlert}
      key={4}
    />,
  ]);

  const progressBar = createProgressBar(currentStepIndex, steps.length);

  useEffect(() => {
    if (errorAlert) {
      setTimeout(() => {
        setErrorAlert(false);
      }, 2000);
    }

    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    }
  }, [errorAlert, successAlert]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();

    try {
      if (data.isSigned) {
        const response = await axios.post(`/api/contracts/company`, {
          data,
          userID: userData.data._id,
        });

        setSuccessAlert(true);
      } else {
        setErrorAlert(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        router.replace("/contracts");
      }, 1000);
    }
  };

  return (
    <main className="contract__create">
      <header className="contract__create__header">
        <div className="contract__create__header__progress">
          <div className="contract__create__header__progress__title">
            Create A Contract
          </div>
          <div className="contract__create__header__progress__steps">
            <p>Create{` > `}</p>
            <p className={`${currentStepIndex === 0 && "progress--active"}`}>
              General Info{` > `}
            </p>
            <p className={`${currentStepIndex === 1 && "progress--active"}`}>
              Scope of Work{` > `}
            </p>
            <p className={`${currentStepIndex === 2 && "progress--active"}`}>
              Payment Details{` > `}
            </p>
            <p className={`${currentStepIndex === 3 && "progress--active"}`}>
              Sign
            </p>
          </div>
        </div>
        <AvatarDetail />
      </header>
      <div
        className="contract__create__progressBar"
        style={{ width: `${progressBar}%` }}
      />
      <div className="contract__create__content">
        <form onSubmit={onSubmit} className="contract__create__content__form">
          {step}
          <div className="contract__create__content__form__btns">
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                className="contract__create__content__form__btns__back"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="contract__create__content__form__btns__next"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
      {errorAlert && (
        <div className="contract__create__alert--error">
          You have to sign the contract
        </div>
      )}
      {successAlert && (
        <div className="contract__create__alert--success">
          Contract Successfully Created
        </div>
      )}
    </main>
  );
};

export default ContractCreate;
