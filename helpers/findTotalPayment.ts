import { IUserPayment } from "@/interface";
import { ICardReport } from "@/interface";

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
