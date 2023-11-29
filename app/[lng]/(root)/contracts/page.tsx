import "@/sass/pages/_contracts.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import ContractsSummary from "@/scenes/ContractPage/ContractsSummary";
import ContractsActive from "@/scenes/ContractPage/ContractsActive";
import ContractsClient from "@/scenes/ContractPage/ContractsClient";

import { useTranslation } from "@/i18n";

const Contracts = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = await useTranslation(lng);

  return (
    <main className="contracts">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Contracts</div>
        </div>
        <AvatarDetail hasBtn lng={lng} />
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
