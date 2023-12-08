import "@/sass/pages/_cards.scss";
import "@/sass/layout/_pageHeader.scss";

import "@/sass/pages/_cards.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import CardsSummary from "@/scenes/CardsPage/CardsSummary";
import CardsReport from "@/scenes/CardsPage/CardsReport";
import CardsTransaction from "@/scenes/CardsPage/CardsTransaction";
import CardsDetail from "@/scenes/CardsPage/CardsDetail";

import { useTranslation } from "@/i18n";

const Cards = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = await useTranslation(lng);

  return (
    <main className="cards">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">
            {t("cards.main.title")}
          </div>
        </div>
        <AvatarDetail lng={lng} />
      </header>
      <div className="cards__content">
        <div className="cards__content__stats">
          <CardsSummary lng={lng} />
          <CardsReport lng={lng} />
          <CardsTransaction />
        </div>
        <CardsDetail />
      </div>
    </main>
  );
};

export default Cards;
