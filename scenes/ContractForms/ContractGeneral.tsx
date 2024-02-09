"use client";

import "@/sass/scenes/_contractGeneralForm.scss";

import ContractFormWrapper from "@/components/ContractFormWrapper/ContractFormWrapper";

import { ICompanyContracts } from "@/interface";

import { definedContracts } from "@/constants";

type GeneralFormData = {
  client: string;
  company: string;
  rate: string;
  projectName: string;
  currency: string;
  date: string;
};

type GeneralFormProps = GeneralFormData & {
  updateFields: (fields: Partial<GeneralFormData>) => void;
};

import useSWR from "swr";
import { useGlobalContext } from "@/context/store";

import axios from "axios";
import { useEffect, useState } from "react";

const ContractGeneral = ({
  client,
  company,
  rate,
  projectName,
  currency,
  date,
  updateFields,
}: GeneralFormProps) => {
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
    }
  }, [errorAlert]);

  const { data } = useGlobalContext();

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error: any) {
      setErrorAlert(error?.message);
    }
  };

  const {
    data: companyContracts,
    mutate,
    isLoading,
  } = useSWR(`/api/contracts/fetch/${data._id}`, fetcher);

  const activeContracts = companyContracts?.data?.contracts.map(
    (contract: ICompanyContracts) => contract.company,
  );

  return (
    <ContractFormWrapper title="General Info">
      <div className="contract__general__oneColumn">
        <label htmlFor="client">Client</label>
        <input
          type="text"
          id="client"
          required
          placeholder="Enter client name"
          value={client}
          onChange={(e) => updateFields({ client: e.target.value })}
          autoComplete="off"
        />
      </div>
      <div className="contract__general__twoColumn">
        <div className="contract__general__oneColumn">
          <label htmlFor="company">Company</label>
          <select
            id="company"
            value={company}
            onChange={(e) => updateFields({ company: e.target.value })}
            required
            autoComplete="off"
          >
            <option value="">{``}</option>
            {definedContracts.map((contract, index) => {
              if (!activeContracts?.includes(contract)) {
                return (
                  <option key={index} value={contract}>
                    {contract}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className="contract__general__oneColumn">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => updateFields({ currency: e.target.value })}
            required
            autoComplete="off"
          >
            <option value="AZN">AZN</option>
          </select>
        </div>
      </div>
      <div className="contract__general__twoColumn">
        <div className="contract__general__oneColumn">
          <label htmlFor="project">Project Name</label>
          <input
            type="text"
            id="project"
            required
            placeholder="UI/UX Design for Beauty Start-up"
            value={projectName}
            onChange={(e) => updateFields({ projectName: e.target.value })}
            autoComplete="off"
          />
        </div>

        <div className="contract__general__oneColumn">
          <label htmlFor="rate">Fixed Rate</label>
          <input
            type="number"
            id="rate"
            required
            placeholder="Enter fixed rate (Max,1000₼)"
            value={rate}
            style={{ padding: "10px" }}
            onChange={(e) => updateFields({ rate: e.target.value })}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="contract__general__oneColumn">
        <label htmlFor="date">Contractor Start Date</label>
        <input
          type="date"
          id="date"
          required
          placeholder="Select Date"
          value={date}
          onChange={(e) => updateFields({ date: e.target.value })}
          autoComplete="off"
        />
      </div>
      {errorAlert !== "" && (
        <div className="contract__general__alert--error">{errorAlert}</div>
      )}
    </ContractFormWrapper>
  );
};

export default ContractGeneral;
