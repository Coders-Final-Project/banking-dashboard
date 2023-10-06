"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: string;
  iconExtra?: string;
  text: string;
  route: string;
}

const SidebarItem = ({ icon, text, iconExtra, route }: Props) => {
  const pathname = usePathname();

  const isActive =
    (pathname.includes(route) && route.length > 1) || pathname === route;

  return (
    <Link
      href={`/${route}`}
      className={`sidebar__links__item ${isActive && "active"}`}
    >
      <Image
        src={`/assets/sidebar/${icon}`}
        alt={text}
        width={24}
        height={24}
        className="sidebar__links__item__icon"
      />
      {iconExtra && (
        <Image
          src={`/assets/sidebar/${iconExtra}`}
          alt={text}
          width={7}
          height={10}
          className="sidebar__links__item__icon__extra"
        />
      )}
      <div className="sidebar__links__item__text">{text}</div>
    </Link>
  );
};

export default SidebarItem;
