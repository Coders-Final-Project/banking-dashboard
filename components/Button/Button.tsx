import Image from "next/image";

import "@/sass/components/_button.scss";

interface Props {
  text: string;
  icon: string;
  isbBgBlack?: boolean;
}

const Button = ({ text, icon, isbBgBlack }: Props) => {
  return (
    <button className={`button ${isbBgBlack && "button__black"}`}>
      <p className="button__text">{text}</p>
      <Image
        src={`/assets/home/${icon}`}
        alt="icon"
        width={24}
        height={24}
        className="button__icon"
      />
    </button>
  );
};

export default Button;
