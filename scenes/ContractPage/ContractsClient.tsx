import Image from "next/image";

import "@/sass/scenes/_contractsClient.scss";

import { contractClients } from "@/db/contracts";

import ContractClientItem from "@/components/ContractClientItem/ContractClientItem";

const ContractsClient = () => {
  return (
    <div className="contracts__content__client">
      <div className="contracts__content__client__header">
        <div className="contracts__content__client__header__title">
          Client Contract
        </div>
        <Image
          src="/assets/contracts/dot.png"
          alt="dot"
          width={24}
          height={24}
          className="contracts__content__client__header__icon"
        />
      </div>
      <div className="contracts__content__client__body">
        {contractClients.map((client) => (
          <ContractClientItem key={client.id} {...client} />
        ))}
      </div>
    </div>
  );
};

export default ContractsClient;
