import Image from "next/image";
import Link from "next/link";

import LangSwitcher from "../LangSwitcher/LangSwitcher";

import "@/sass/layout/_sidebar.scss";

import MainLogo from "@/components/MainLogo/MainLogo";
import SidebarItem from "@/components/SidebarItem/SidebarItem";

import { getIntl } from "../../lib/intl";

type SidebarProps = {
  params: { locale: string };
};

const Sidebar = async ({ params: { locale } }: SidebarProps) => {
  const intl = await getIntl(locale);

  const sidebarLinks = [
    {
      id: 1,
      icon: "home.png",
      route: "/",
      text: `${intl.formatMessage({ id: "sidebar.link1.title" })}`,
    },
    {
      id: 2,
      icon: "edit.png",
      route: "contracts",
      text: `${intl.formatMessage({ id: "sidebar.link2.title" })}`,
    },
    {
      id: 3,
      icon: "document-text.png",
      route: "documents",
      text: `${intl.formatMessage({ id: "sidebar.link3.title" })}`,
    },
    {
      id: 4,
      icon: "document-normal.png",
      iconExtra: "vector.png",
      route: "invoices",
      text: `${intl.formatMessage({ id: "sidebar.link4.title" })}`,
    },
    {
      id: 5,
      icon: "convert-card.png",
      route: "transactions",
      text: `${intl.formatMessage({ id: "sidebar.link5.title" })}`,
    },
    {
      id: 6,
      icon: "security.png",
      iconExtra: "frame.png",
      route: "insurance",
      text: `${intl.formatMessage({ id: "sidebar.link6.title" })}`,
    },
    {
      id: 7,
      icon: "card.png",
      route: "cards",
      text: `${intl.formatMessage({ id: "sidebar.link7.title" })}`,
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__main">
        <MainLogo />
        <LangSwitcher />
      </div>
      <div className="sidebar__links">
        {sidebarLinks.map((link) => (
          <SidebarItem
            key={link.id}
            icon={link.icon}
            iconExtra={link.iconExtra}
            text={link.text}
            route={link.route}
          />
        ))}
      </div>
      <Link href="/settings" className="sidebar__settings">
        <Image
          src="/assets/sidebar/setting.png"
          alt="setting"
          width={24}
          height={24}
          className="sidebar__settings__icon"
        />
        <div className="sidebar__settings__text">
          {intl.formatMessage({ id: "sidebar.link8.title" })}
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
