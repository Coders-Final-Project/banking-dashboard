import "@/sass/pages/_home.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import HomeTotal from "./_components/HomeTotal";
import HomeMethod from "./_components/HomeMethod";
import HomePayment from "./_components/HomePayment";
import HomeTransaction from "./_components/HomeTransaction";

import { user } from "@/db/user";

export default function Home() {
  return (
    <main className="home">
      <header className="home__header">
        <div className="home__header__welcome">
          <div className="home__header__welcome__title">
            Good morning, {user.name.split(" ")[0]}
          </div>
          <div className="home__header__welcome__desc">
            Here is your dashboard overview.
          </div>
        </div>
        <AvatarDetail {...user} hasBtn />
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
