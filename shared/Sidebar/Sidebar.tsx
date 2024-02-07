import Image from "next/image";
import Link from "next/link";

import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../i18n/settings";
import { useTranslation } from "@/i18n";

import "@/sass/layout/_sidebar.scss";

import MainLogo from "@/components/MainLogo/MainLogo";
import SidebarItem from "@/components/SidebarItem/SidebarItem";

const Sidebar = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng);

  const sidebarLinks = [
    {
      id: 1,
      icon: "house.png",
      route: `/`,
      text: `${t("sidebar.link1.title")}`,
    },
    {
      id: 2,
      icon: "contract.png",
      route: "contracts",
      text: `${t("sidebar.link2.title")}`,
    },
    {
      id: 3,
      icon: "document.png",
      route: "documents",
      text: `${t("sidebar.link3.title")}`,
    },
    {
      id: 4,
      icon: "invoice.png",
      iconExtra: "vector.png",
      route: "invoices",
      text: `${t("sidebar.link4.title")}`,
    },
    {
      id: 5,
      icon: "payment.png",
      route: "transactions",
      text: `${t("sidebar.link5.title")}`,
    },
    {
      id: 6,
      icon: "insurance.png",
      iconExtra: "frame.png",
      route: "insurance",
      text: `${t("sidebar.link6.title")}`,
    },
    {
      id: 7,
      icon: "cards.png",
      route: "cards",
      text: `${t("sidebar.link7.title")}`,
    },
    {
      id: 8,
      icon: "chat.png",
      route: "chatbot",
      text: `Chatbot`,
    },
    {
      id: 9,
      icon: "phone.png",
      route: "contact",
      text: `Contact`,
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__main">
        <MainLogo />
      </div>
      <div className="sidebar__links">
        {sidebarLinks.map((link) => (
          <SidebarItem
            key={link.id}
            icon={link.icon}
            iconExtra={link.iconExtra}
            text={link.text}
            route={link.route}
            lng={lng}
          />
        ))}
      </div>
      <Link href={`/${lng}/settings`} className="sidebar__settings">
        <Image
          src="/assets/sidebar/setting.png"
          alt="setting"
          width={24}
          height={24}
          className="sidebar__settings__icon"
        />
        <div className="sidebar__settings__text">
          {t("sidebar.link8.title")}
        </div>
      </Link>
      <div className="lang__switcher">
        <Trans i18nKey="languageSwitcher" t={t}>
          <span className="lang__switcher__item active">
            <Image
              src={`/assets/sidebar/${lng === "az" ? "aze" : "eng"}.png`}
              alt="country"
              width={24}
              height={24}
              className="sidebar__settings__icon"
            />
          </span>{" "}
        </Trans>
        {languages
          .filter((l) => lng !== l)
          .map((l, index) => {
            return (
              <span key={l} className="lang__switcher__item">
                {index > 0 && " or "}
                <Link href={`/${l}`} className="lang__switcher__item__link">
                  <Image
                    src={`/assets/sidebar/${l === "az" ? "aze" : "eng"}.png`}
                    alt="country"
                    width={24}
                    height={24}
                    className="sidebar__settings__icon"
                  />
                </Link>
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
