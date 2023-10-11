import "@/sass/scenes/_contractGeneralForm.scss";

import ContractFormWrapper from "@/components/ContractFormWrapper/ContractFormWrapper";

const ContractGeneral = () => {
  return (
    <ContractFormWrapper title="General Info">
      <div className="contract__general__oneColumn">
        <label htmlFor="client">Client</label>
        <input type="text" id="client" placeholder="Enter client name" />
      </div>
      <div className="contract__general__twoColumn">
        <div className="contract__general__oneColumn">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" placeholder="Enter company name" />
        </div>
        <div className="contract__general__oneColumn">
          <label htmlFor="job">Job title</label>
          <input type="text" id="job" placeholder="Enter job title" />
        </div>
      </div>
      <div className="contract__general__twoColumn">
        <div className="contract__general__oneColumn">
          <label htmlFor="project">Project Name</label>
          <input
            type="text"
            id="project"
            placeholder="UI/UX Design for Beauty Start-up"
          />
        </div>
        <div className="contract__general__oneColumn">
          <label htmlFor="currency">Currency</label>
          <select id="currency">
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="azn">AZN</option>
          </select>
        </div>
      </div>
      <div className="contract__general__oneColumn">
        <label htmlFor="date">Contractor Start Date</label>
        <input type="date" id="date" placeholder="Select Date" />
      </div>
    </ContractFormWrapper>
  );
};

export default ContractGeneral;
