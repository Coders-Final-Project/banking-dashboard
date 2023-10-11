import "@/sass/pages/_contracts.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import ContractsSummary from "../../scenes/ContractPage/ContractsSummary";
import ContractsActive from "../../scenes/ContractPage/ContractsActive";
import ContractsClient from "../../scenes/ContractPage/ContractsClient";

import { user } from "@/db/user";

const Contracts = () => {
  return (
    <main className="contracts">
      <header className="contracts__header">
        <div className="contracts__header__welcome">Contracts</div>
        <AvatarDetail {...user} hasBtn />
      </header>
      <div className="contracts__content">
        <div className="contracts__content__leftSide">
          <ContractsSummary />
          <ContractsActive />
        </div>
        <ContractsClient />
      </div>
    </main>
  );
};

export default Contracts;
