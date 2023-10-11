import Image from "next/image";
import Link from "next/link";

import "@/sass/components/_button.scss";

interface Props {
  text: string;
  icon: string;
  isbBgBlack?: boolean;
  url: string;
}

const Button = ({ text, icon, isbBgBlack, url }: Props) => {
  return (
    <Link href={url} className={`button ${isbBgBlack && "button__black"}`}>
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
