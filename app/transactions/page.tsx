import "@/sass/pages/_transactions.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import { user } from "@/db/user";

const Transactions = () => {
  return (
    <main className="transactions">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Transactions</div>
        </div>
        <AvatarDetail {...user} />
      </header>
      <div className="transactions__content">transactions</div>
    </main>
  );
};

export default Transactions;
