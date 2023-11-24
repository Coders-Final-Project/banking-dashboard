import "@/sass/scenes/_contractPaymentForm.scss";

import ContractFormWrapper from "@/components/ContractFormWrapper/ContractFormWrapper";

type PaymnetFormData = {
  projectName: string;
  currency: string;
  cycleEnd: string;
  paymentDue: string;
};

type PaymentFormProps = PaymnetFormData & {
  updateFields: (fields: Partial<PaymnetFormData>) => void;
};

const ContractPayment = ({
  projectName,
  currency,
  cycleEnd,
  paymentDue,
  updateFields,
}: PaymentFormProps) => {
  return (
    <ContractFormWrapper title="Payment Details">
      <div className="contract__payment__row">
        <div className="contract__payment__row__title">Define Payment Rate</div>
        <div className="contract__payment__twoColumn">
          <div className="contract__payment__oneColumn">
            <label htmlFor="project">Project Name</label>
            <input
              type="text"
              id="project"
              required
              placeholder="$ 10,000"
              value={projectName}
              onChange={(e) => updateFields({ projectName: e.target.value })}
            />
          </div>
          <div className="contract__payment__oneColumn select">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              value={currency}
              required
              onChange={(e) => updateFields({ currency: e.target.value })}
            >
              <option value="AZN">AZN</option>
            </select>
          </div>
        </div>
      </div>
      <div className="contract__payment__row">
        <div className="contract__payment__row__title">Invoicing</div>
        <div className="contract__payment__twoColumn">
          <div className="contract__payment__oneColumn">
            <label htmlFor="ends">Invoice Cycle Ends</label>
            <select
              id="ends"
              value={cycleEnd}
              required
              onChange={(e) => updateFields({ cycleEnd: e.target.value })}
            >
              <option value="Last day of the month">
                Last day of the month
              </option>
              <option value="In a three month">In a three month</option>
              <option value="At the end of the year">
                At the end of the year
              </option>
            </select>
          </div>
          <div className="contract__payment__oneColumn">
            <label htmlFor="due">Payment Due</label>
            <select
              id="due"
              value={paymentDue}
              required
              onChange={(e) => updateFields({ paymentDue: e.target.value })}
            >
              <option value="Same Day">Same day</option>
              <option value="In a week">In a week</option>
              <option value="This month">This month</option>
            </select>
          </div>
        </div>
      </div>
    </ContractFormWrapper>
  );
};

export default ContractPayment;
