"use client";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

import { useMultiplestepForm } from "@/hooks/useMultiplestepForm";

import "@/sass/pages/_contractCreate.scss";

import ContractGeneral from "@/scenes/ContractForms/ContractGeneral";
import ContractPayment from "@/scenes/ContractForms/ContractPayment";
import ContractScope from "@/scenes/ContractForms/ContractScope";
import ContractSign from "@/scenes/ContractForms/ContractSign";

import { user } from "@/db/user";
import { FormEvent } from "react";

const ContractCreate = () => {
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
    <ContractGeneral key={1} />,
    <ContractScope key={2} />,
    <ContractPayment key={3} />,
    <ContractSign key={4} />,
  ]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
  };

  return (
    <main className="contract__create">
      <header className="contract__create__header">
        <div className="contract__create__header__progress">
          <div className="contract__create__header__progress__title">
            Create A Contract
          </div>
          <div className="contract__create__header__progress__steps">
            {`Create > General Info > Scope of Work > Payment Details > `}
            <span>Sign</span>
          </div>
        </div>
        <AvatarDetail {...user} />
      </header>
      <div className="contract__create__progressBar" style={{ width: "20%" }} />
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
    </main>
  );
};

export default ContractCreate;
