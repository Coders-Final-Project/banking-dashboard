import "@/sass/pages/_home.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import HomeTotal from "./_components/HomeTotal";
import HomeMethod from "./_components/HomeMethod";

import { user } from "@/db/user";

export default function Home() {
  return (
    <>
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
        <div className="home__content__payment"></div>
        <div className="home__content__transaction"></div>
      </div>
    </>
  );
}
