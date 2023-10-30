import "@/sass/pages/_home.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import HomeTotal from "../../scenes/HomePage/HomeTotal";
import HomeMethod from "../../scenes/HomePage/HomeMethod";
import HomePayment from "../../scenes/HomePage/HomePayment";
import HomeTransaction from "../../scenes/HomePage/HomeTransaction";

import { user } from "@/db/user";

export default function Home() {
  return (
    <main className="home">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">
            Welcome, {user.name.split(" ")[0]}
          </div>
          <div className="page__header__welcome__desc">
            Here is your dashboard overview.
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
