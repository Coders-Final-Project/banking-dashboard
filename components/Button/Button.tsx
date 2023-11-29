import Image from "next/image";
import Link from "next/link";

import "@/sass/components/_button.scss";

interface Props {
  text: string;
  icon: string;
  isbBgBlack?: boolean;
  url: string;
  lng?: string;
}

const Button = ({ text, icon, isbBgBlack, url, lng }: Props) => {
  return (
    <Link
      href={`/${lng}/contracts/${url}`}
      className={`button ${isbBgBlack && "button__black"}`}
    >
      <p className="button__text">{text}</p>
      <Image
        src={`/assets/home/${icon}`}
        alt="icon"
        width={24}
        height={24}
        className="button__icon"
      />
    </Link>
  );
};

export default Button;
