"use client";

import "@/sass/layout/_pageHeader.scss";
import { useSearchParams } from "next/navigation";
import Personal from "@/components/Personal/Personal";
import Withdrawal from "@/components/Withdrawal/Withdrawal";

const Settings = () => {
  const searchParams = useSearchParams();
  const isTabs = searchParams.has("withdrawal");

  return <main>{isTabs ? <Withdrawal /> : <Personal />}</main>;
import "@/sass/pages/_settings.scss";
import "@/sass/layout/_pageHeader.scss";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

const Settings = () => {
  return (
    <main className="settings">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Settings</div>
        </div>
        <AvatarDetail />
      </header>
    </main>
  );
};

export default Settings;
