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
  _id: number;
  firstName: string;
  lastName: string;
  profileImg: [{ fileUrl: { public_id: string; secure_url: string } }];
  job: string;
  lng: string;
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
  lng: string;
}

export interface IAllCustomers {
  _id: number;
  firstName: string;
  lastName: string;
  job: string;
  profileImg: [{ fileUrl: { public_id: string; secure_url: string } }];
}

export interface CardProps {
  _id: number;
  userName: string;
  userSurname: string;
  cardNumber: string;
  endDate: string;
  securityCode: string;
  balance: number;
}

export interface IContractual {
  _id: string;
  company: string;
  projectName: string;
  rate: string;
  createdAt: string;
}

export interface ITransactions {
  _id: string;
  receiverName: string;
  receiverSurname: string;
  receiverJob: string;
  createdAt: string;
  amount: string;
  profileImg: [{ fileUrl: { public_id: string; secure_url: string } }];
}

export interface INotifications {
  _id: string;
  userId: string;
  key: string;
  content: string;
  createdAt: string;
}

export interface IInvoices {
  _id: string;
  userId: string;
  no: string;
  client: string;
  status: string;
  amount: number;
  createdAt: string;
}

export interface IChatbotMessages {
  key: string;
  value: string;
}

export interface StateProps {
  userCard: CardProps;
  curLang: string;
  insuranceCompleted: boolean;
  notificationCount: number;
  chatbotMessages: IChatbotMessages[];
  contractsLength: number;
}

export interface UploadedFileProps {
  fileName: string;
  fileUrl: { public_id: string; secure_url: string };
}

export interface UploadedImgProps {
  fileUrl: { public_id: string; secure_url: string };
}

export interface UploadedProfileProps {
  dateOfBirth: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
}
