import Image from "next/image";
import Link from "next/link";

import "@/sass/layout/_sidebar.scss";

import MainLogo from "@/components/MainLogo/MainLogo";
import SidebarItem from "@/components/SidebarItem/SidebarItem";

const Sidebar = async () => {
  const sidebarLinks = [
    {
      id: 1,
      icon: "home.png",
      route: "/",
      text: "Home",
    },
    {
      id: 2,
      icon: "edit.png",
      route: "contracts",
      text: "Contracts",
    },
    {
      id: 3,
      icon: "document-text.png",
      route: "documents",
      text: "Documents",
    },
    {
      id: 4,
      icon: "document-normal.png",
      iconExtra: "vector.png",
      route: "invoices",
      text: "Invoices",
    },
    {
      id: 5,
      icon: "convert-card.png",
      route: "transactions",
      text: "Transactions",
    },
    {
      id: 6,
      icon: "security.png",
      iconExtra: "frame.png",
      route: "insurance",
      text: "Insurance",
    },
    {
      id: 7,
      icon: "card.png",
      route: "cards",
      text: "Cards",
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
        <div className="sidebar__settings__text">Settings</div>
      </Link>
    </div>
  );
};

export default Sidebar;
