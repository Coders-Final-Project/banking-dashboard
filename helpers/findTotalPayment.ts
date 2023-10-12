import { IUserPayment } from "@/interface";

export const findTotalPayment = ({
  duration,
  userPaymentHistory,
}: {
  duration: string;
  userPaymentHistory: IUserPayment;
}) => {
  const total = userPaymentHistory[duration].datasets[0].data.reduce(
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
