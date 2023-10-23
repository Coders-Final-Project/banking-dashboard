import { IInvoicesData, IUserPayment } from "@/interface";
import { ICardReport } from "@/interface";
import { IFilterTableProps, IActionsTableProps } from "@/interface";

export const findTotalPayment = ({
  duration,
  data, 
}: {
  duration: string;
  data: IUserPayment | ICardReport;
}) => {
  const total = data[duration].datasets[0].data.reduce(
    (cur: number, item) => +item + cur,
    0,
  );

  const fullPart = total.toString().split(".")[0];
  const fractioanalPart = total.toString().split(".")[1];

  return { fullPart, fractioanalPart };
};

export const createProgressBar = (index: number, length: number) => {
  return ((index + 1) * 100) / length;
};

export const hideCardNumbers = (cardNumber: string) => {
  const newValue = "**** " + cardNumber.slice(-4);
  return newValue;
};

export const checkActiveCard = (date: string) => {
  const currectDate = Date.now();
  const cardMonth = date.slice(0, 2);
  const cardYear = date.slice(3);

  const cardDate = new Date(`20${cardYear}-${cardMonth}`).getTime();

  if (cardDate < currectDate) {
    return "No Active";
  } else {
    return "Active";
  }
};

export const filterCardsTable = ({
  input,
  data,
  check,
}: {
  input: string;
  data: IFilterTableProps[];
  check: boolean;
}) => {
  if (input === "name") {
    return [...data].sort((a, b) =>
      !check ? (a.name > b.name ? 1 : -1) : a.name > b.name ? -1 : 1,
    );
  }
  if (input === "date") {
    return [...data].sort((a, b) =>
      !check ? (a.date > b.date ? 1 : -1) : a.date > b.date ? -1 : 1,
    );
  }
  if (input === "amount") {
    return [...data].sort((a, b) =>
      !check ? b.amount - a.amount : a.amount - b.amount,
    );
  }
};

export const filterInvoiceTable = ({
  input,
  data,
  changeState,
}: {
  input: string;
  data: IInvoicesData[];
  changeState: boolean;
}) => {
  if (input == "amount") {
    const filterAmounts = data.sort((a, b) => {
      return !changeState ? b.amount - a.amount : a.amount - b.amount;
    });

    return filterAmounts;
  }

  if (input == "PENDING") {
    const filteredPendings = data.filter((item) => {
      return !changeState ? item.status == "PENDING" : item.status;
    });
    console.log(filteredPendings);

    return filteredPendings;
  }
  
export const filterActionsTable = ({
  input,
  data,
  check,
}: {
  input: string;
  data: IActionsTableProps[];
  check: boolean;
}) => {
  if (input === "client") {
    return [...data].sort((a, b) =>
      !check
        ? a.personName > b.personName
          ? 1
          : -1
        : a.personName > b.personName
        ? -1
        : 1,
    );
  }
  if (input === "payment") {
    return [...data].sort((a, b) =>
      !check
        ? a.paymentDate > b.paymentDate
          ? 1
          : -1
        : a.paymentDate > b.paymentDate
        ? -1
        : 1,
    );
  }
  if (input === "method") {
    return [...data].sort((a, b) =>
      !check
        ? a.paymentTitle > b.paymentTitle
          ? 1
          : -1
        : a.paymentTitle > b.paymentTitle
        ? -1
        : 1,
    );
  }
  if (input === "date") {
    return [...data].sort((a, b) =>
      !check ? b.price - a.price : a.price - b.price,
    );
  }
};
