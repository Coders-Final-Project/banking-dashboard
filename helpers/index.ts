import { IUserPayment } from "@/interface";
import { ICardReport } from "@/interface";
import { IFilterTableProps } from "@/interface";

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

export const filterTable = ({
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
