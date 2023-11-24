import React from "react";
import "@/sass/pages/_settings.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="settings">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Settings</div>
        </div>
        <AvatarDetail />
      </header>

      <div className="settings__links">
        <div className="settings__links-personal">
          <Link href={{ pathname: "/settings" }}>Personal</Link>
        </div>
        <div className="settings__links-withdrawal">
          <Link
            href={{
              pathname: "/settings",
              query: { withdrawal: "withdrawal" },
            }}
          >
            Withdrawal Methods
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
