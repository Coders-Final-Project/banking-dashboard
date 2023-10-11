import "@/sass/scenes/_contractGeneralForm.scss";

import ContractFormWrapper from "@/components/ContractFormWrapper/ContractFormWrapper";

type GeneralFormData = {
  client: string;
  compnay: string;
  job: string;
  projectName: string;
  currency: string;
  date: string;
};

type GeneralFormProps = GeneralFormData & {
  updateFields: (fields: Partial<GeneralFormData>) => void;
};

const ContractGeneral = ({
  client,
  compnay,
  job,
  projectName,
  currency,
  date,
  updateFields,
}: GeneralFormProps) => {
  return (
    <ContractFormWrapper title="General Info">
      <div className="contract__general__oneColumn">
        <label htmlFor="client">Client</label>
        <input
          type="text"
          id="client"
          placeholder="Enter client name"
          value={client}
          onChange={(e) => updateFields({ client: e.target.value })}
        />
      </div>
      <div className="contract__general__twoColumn">
        <div className="contract__general__oneColumn">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            placeholder="Enter company name"
            value={compnay}
            onChange={(e) => updateFields({ compnay: e.target.value })}
          />
        </div>
        <div className="contract__general__oneColumn">
          <label htmlFor="job">Job title</label>
          <input
            type="text"
            id="job"
            placeholder="Enter job title"
            value={job}
            onChange={(e) => updateFields({ job: e.target.value })}
          />
        </div>
      </div>
      <div className="contract__general__twoColumn">
        <div className="contract__general__oneColumn">
          <label htmlFor="project">Project Name</label>
          <input
            type="text"
            id="project"
            placeholder="UI/UX Design for Beauty Start-up"
            value={projectName}
            onChange={(e) => updateFields({ projectName: e.target.value })}
          />
        </div>
        <div className="contract__general__oneColumn">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => updateFields({ currency: e.target.value })}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="azn">AZN</option>
          </select>
        </div>
      </div>
      <div className="contract__general__oneColumn">
        <label htmlFor="date">Contractor Start Date</label>
        <input
          type="date"
          id="date"
          placeholder="Select Date"
          value={date}
          onChange={(e) => updateFields({ date: e.target.value })}
        />
      </div>
    </ContractFormWrapper>
  );
};

export default ContractGeneral;
