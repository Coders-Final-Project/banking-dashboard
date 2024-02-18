"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: string;
  iconExtra?: string;
  text: string;
  route: string;
  lng: string;
}

const SidebarItem = ({ icon, text, iconExtra, route, lng }: Props) => {
  const pathname = usePathname();

  const isActive =
    (pathname.includes(route) && route.length > 1) ||
    pathname === route + `${lng}`;

  return (
    <Link
      href={`/${lng}/${route}`}
      className={`sidebar__links__item ${isActive && "active"}`}
    >
      <Image
        src={`/assets/sidebar/${icon}`}
        alt={text}
        width={24}
        height={24}
        className="sidebar__links__item__icon"
      />
      <div className="sidebar__links__item__text">{text}</div>
    </Link>
  );
};

export default SidebarItem;
