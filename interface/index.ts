export interface IUserPayment {
  [key: string]: {
    labels: string[];
    datasets: {
      label: string;
      data: (string | number)[];
      backgroundColor: string;
      borderColor: string;
    }[];
  };
}

export interface ICardReport {
  [key: string]: {
    labels: string[];
    datasets: {
      label: string;
      data: (string | number)[];
      backgroundColor: string;
      borderColor: string;
    }[];
  };
}

export interface IContractItem {
  id: number;
  companyImg: string;
  company: string;
  companyLocation: string;
  amount: string;
  clientName: string;
  startDate: string;
  endDate: string;
}
export interface IContractClient {
  id: number;
  clientImg: string;
  clientName: string;
  clientCompany: string;
}

export interface FormData {
  client: string;
  company: string;
  rate: string;
  projectName: string;
  currency: string;
  date: string;
  workScope: string;
  cycleEnd: string;
  paymentDue: string;
  isSigned: boolean;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export interface ICardFormVaues {
  cardNumber: string;
  endDate: string;
  securityCode: string;
}

export interface IFilterTableProps {
  id: number;
  name: string;
  iconUrl: string;
  date: string;
  amount: number;
}

export interface IInvoicesData {
  no: string;
  date: string;
  client: string;
  amount: number;
  status: string;
}

export interface IActionsTableProps {
  id: number;
  personName: string;
  personImg: string;
  company: string;
  paymentDate: string;
  paymentHour: string;
  paymentMethodUrl: string;
  paymentTitle: string;
  paidDate: string;
  price: number;
}

export interface ICompanyContracts {
  _id: number;
  userID: number;
  client: string;
  company: string;
  rate: string;
  projectName: string;
  currency: string;
  date: string;
  workSpace: string;
  cycleEnd: string;
  paymentDue: string;
  isSIgned: boolean;
}

export interface CardProps {
  _id: number;
  cardNumber: string;
  endDate: string;
  securityCode: string;
}

export interface StateProps {
  companyContracts: ICompanyContracts[];
  userCard: CardProps;
}
