import Image from "next/image";

import "@/sass/scenes/_contractSign.scss";

type SignFormData = {
  isSigned: boolean;
  successAlert: boolean;
};

type SignFormProps = SignFormData & {
  updateFields: (fields: Partial<SignFormData>) => void;
};

const ContractSign = ({
  isSigned,
  updateFields,
  successAlert,
}: SignFormProps) => {
  return (
    <div className="contract__sign">
      <div className="contract__sign__header">
        <div className="contract__sign__header__title">Review & Sign</div>
        <div className="contract__sign__header__btns">
          <button className="contract__sign__header__btns__invite">
            Invite Client
          </button>
          <button
            type="button"
            disabled={successAlert}
            onClick={(e) => updateFields({ isSigned: !isSigned })}
            className="contract__sign__header__btns__sign"
          >
            {isSigned ? "Signed" : "Sign Contract"}
          </button>
        </div>
      </div>
      <div className="contract__sign__divider" />
      <Image
        src="/assets/contracts/star.png"
        alt="star"
        width={88}
        height={88}
        className="contract__sign__star"
      />
      <div className="contract__sign__agreement">
        <div className="contract__sign__agreement__title">
          contractor agreement
        </div>
        <div className="contract__sign__agreement__body">
          <div className="contract__sign__agreement__body__item">
            This Freelance Contract (this Agreement) is made as of [Effective
            Date], between [Clients Name and Address] (the Client) and
            [Independent Contractors Name and Address] (the Independent
            Contractor). Client and Independent Contractor may each be referred
            to in this Agreement as a Party and collectively as the Parties.
          </div>
          <div className="contract__sign__agreement__body__item">
            <span>1. Services:</span> Independent Contractor shall provide the
            following services to Client (the Services). In addition,
            Independent Contractor shall perform such other duties and tasks, or
            changes to the Services, as may be agreed upon by the parties.
          </div>
          <div className="contract__sign__agreement__body__item">
            <span>2. Compensation:</span> In consideration for Independent
            Contractors performance of the Services, Client shall pay
            Independent Contractor [insert payment details].
          </div>
          <div className="contract__sign__agreement__body__item">
            <span>3. Expenses:</span> All costs and expenses incurred by
            Independent Contractor in connection with the performance of the
            Services shall be the sole responsibility of and paid by Independent
            Contractor.
          </div>
          <div className="contract__sign__agreement__body__item">
            <span>4. Term and Termination:</span> Independent Contractors
            engagement with Client under this Agreement shall commence on [start
            date]. The Parties agree and acknowledge that this Agreement and
            Independent Contractors engagement with Client under this Agreement
            shall terminate on [end date]. Upon termination, Independent
            Contractor agrees to return all Client property in the performance
            of the Services.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSign;
