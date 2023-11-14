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
