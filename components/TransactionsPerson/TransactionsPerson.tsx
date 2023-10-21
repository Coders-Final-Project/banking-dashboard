import Image from "next/image";

import "@/sass/components/_transactionsPerson.scss";

const TransactionsPerson = ({ order }: { order: number }) => {
  return (
    <Image
      src={`/assets/transactions/p${order}.png`}
      alt="person"
      width={48}
      height={48}
      className="transactions__person__img"
    />
  );
};

export default TransactionsPerson;
