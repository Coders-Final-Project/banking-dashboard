import "@/sass/pages/_home.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import HomeTotal from "@/scenes/HomePage/HomeTotal";
import HomeMethod from "@/scenes/HomePage/HomeMethod";
import HomePayment from "@/scenes/HomePage/HomePayment";
import HomeTransaction from "@/scenes/HomePage/HomeTransaction";

import { useTranslation } from "@/i18n";

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng);

  return (
    <main className="home">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">
            {t("home.main.title")}
          </div>
          <div className="page__header__welcome__desc">
            {t("home.main.desc")}
          </div>
        </div>
        <AvatarDetail hasBtn lng={lng} />
      </header>
      <div className="home__content">
        <HomeTotal lng={lng} />
        <HomeMethod lng={lng} />
        <HomePayment lng={lng} />
        <HomeTransaction lng={lng} />
      </div>
    </main>
  );
}
