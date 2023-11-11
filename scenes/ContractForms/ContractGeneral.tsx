import "@/sass/scenes/_contractGeneralForm.scss";

import ContractFormWrapper from "@/components/ContractFormWrapper/ContractFormWrapper";

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

const ContractGeneral = ({
  client,
  company,
  rate,
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
          required
          placeholder="Enter client name"
          value={client}
          onChange={(e) => updateFields({ client: e.target.value })}
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
          >
            <option value="Pasha Bank">Pasha Bank</option>
            <option value="Kapital Bank">Kapital Bank</option>
            <option value="Bank of Baku">Bank of Baku</option>
          </select>
        </div>
        <div className="contract__general__oneColumn">
          <label htmlFor="job">Fixed Rate</label>
          <input
            type="text"
            id="rate"
            required
            placeholder="Enter fixed rate"
            value={rate}
            onChange={(e) => updateFields({ rate: e.target.value })}
          />
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
          />
        </div>
        <div className="contract__general__oneColumn">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => updateFields({ currency: e.target.value })}
            required
          >
            <option value="AZN">AZN</option>
          </select>
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
        />
      </div>
    </ContractFormWrapper>
  );
};

export default ContractGeneral;
