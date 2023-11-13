import "@/sass/pages/_home.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import HomeTotal from "@/scenes/HomePage/HomeTotal";
import HomeMethod from "@/scenes/HomePage/HomeMethod";
import HomePayment from "@/scenes/HomePage/HomePayment";
import HomeTransaction from "@/scenes/HomePage/HomeTransaction";

import { getIntl } from "../../../lib/intl";

type HomeProps = {
  params: { locale: string };
};

export default async function Home({ params: { locale } }: HomeProps) {
  const intl = await getIntl(locale);

  return (
    <main className="home">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">
            {intl.formatMessage({ id: "page.home.head.title" })}
          </div>
          <div className="page__header__welcome__desc">
            {intl.formatMessage({ id: "page.home.head.desc" })}
          </div>
        </div>
        <AvatarDetail hasBtn />
      </header>
      <div className="home__content">
        <HomeTotal />
        <HomeMethod />
        <HomePayment />
        <HomeTransaction />
      </div>
    </main>
  );
}
