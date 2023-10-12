import { ReactNode } from "react";

import "@/sass/components/_contractFormWrapper.scss";

interface IWrapperProps {
  title: string;
  children: ReactNode;
}

const ContractFormWrapper = ({ title, children }: IWrapperProps) => {
  return (
    <div className="contract__wrapper">
      <h2 className="contract__wrapper__title">{title}</h2>
      <div className="contract__wrapper__container">{children}</div>
    </div>
  );
};

export default ContractFormWrapper;
