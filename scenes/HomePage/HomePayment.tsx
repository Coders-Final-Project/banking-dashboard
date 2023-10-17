import LineGraph from "@/shared/LineGraph/LineGraph";
import { userPaymentHistory } from "@/db/user";

const HomePayment = () => {
  return (
    <div>
      <LineGraph isHeaderDetail={true} data={userPaymentHistory} />
    </div>
  );
};

export default HomePayment;
