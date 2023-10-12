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
  compnay: string;
  job: string;
  projectName: string;
  currency: string;
  date: string;
  workScope: string;
  cycleEnd: string;
  paymentDue: string;
  isSigned: boolean;
}
