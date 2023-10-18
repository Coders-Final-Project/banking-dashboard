import LineGraph from "@/shared/LineGraph/LineGraph";
import { userPaymentHistory } from "@/db/user";

const HomePayment = () => {
  return (
    <div>
      <LineGraph
        title="Payment History"
        isHeaderDetail={true}
        data={userPaymentHistory}
      />
    </div>
  );
};

export default HomePayment;
