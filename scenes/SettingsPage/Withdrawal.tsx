import "@/sass/scenes/_withdrawal.scss";

import { withdrawalMethods } from "@/db/methods";

import SettingsMethodItem from "@/components/SettingsMethodItem/SettingsMethodItem";

const Withdrawal = () => {
  return (
    <div className="withdrawal">
      <div className="withdrawal__methods">
        <div className="withdrawal__methods__title">Withdrawal Methods</div>
        <div className="withdrawal__methods__content">
          {withdrawalMethods.map((method) => (
            <SettingsMethodItem key={method.id} {...method} />
          ))}
        </div>
      </div>
      <div className="withdrawal__automatic">
        <div className="withdrawal__automatic__header">
          <div className="withdrawal__automatic__header__title">
            Automatic Withdrawal
          </div>
          <div className="withdrawal__automatic__header__toggle">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="withdrawal__automatic__content">
          By activating automatic withdrawal your funds will be directly be
          withdrawn to your preferred payment method every-time payment is
          received.
        </div>
        <button className="withdrawal__automatic__btn">Learn More</button>
      </div>
    </div>
  );
};

export default Withdrawal;
