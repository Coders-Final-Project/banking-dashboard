import Image from "next/image";

import "@/sass/scenes/_contractsActive.scss";

import ContractsItem from "@/components/ContractsItem/ContractsItem";

import { activeContracts } from "@/db/contracts";

const ContractsActive = () => {
  return (
    <div className="contracts__content__active">
      <div className="contracts__content__active__header">
        <div className="contracts__content__active__header__title">
          Active Contracts
        </div>
        <Image
          src="/assets/contracts/dot.png"
          alt="dot"
          width={24}
          height={24}
          className="contracts__content__active__header__icon"
        />
      </div>
      <div className="contracts__content__active__body">
        {activeContracts.map((contract) => (
          <ContractsItem key={contract.id} {...contract} />
        ))}
      </div>
    </div>
  );
};

export default ContractsActive;
