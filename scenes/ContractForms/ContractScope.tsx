"use client";

import { useState } from "react";

import ContractFormWrapper from "@/components/ContractFormWrapper/ContractFormWrapper";

import "@/sass/scenes/_contractScopeForm.scss";

type ScopeFormData = {
  workScope: string;
};

type ScopeFormProps = ScopeFormData & {
  updateFields: (fields: Partial<ScopeFormData>) => void;
};

const ContractScope = ({ workScope, updateFields }: ScopeFormProps) => {
  const [state, setState] = useState({ charCount: 0 });

  const handleKeyPress = (e: any) => {
    const count = e.target.value;

    setState({
      charCount: count.length,
    });
  };

  return (
    <ContractFormWrapper title="Scope of Work">
      <div className="contract__scope__container">
        <div className="contract__scope__container__title">Scope of Work</div>
        <textarea
          onChange={(e) => {
            handleKeyPress(e);
            updateFields({ workScope: e.target.value });
          }}
          maxLength={500}
          className="contract__scope__container__input"
          placeholder="Descripe scope of work"
          value={workScope}
          required
          autoComplete="off"
          name="scope"
        />
        <div className="contract__scope__container__counter">
          {state.charCount}/500
        </div>
      </div>
    </ContractFormWrapper>
  );
};

export default ContractScope;
