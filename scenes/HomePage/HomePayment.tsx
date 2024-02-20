import LineGraph from "@/shared/LineGraph/LineGraph";
import { userPaymentHistory } from "@/db/user";

import { useTranslation } from "@/i18n";

const HomePayment = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng);

  return (
    <div style={{ width: "100%" }}>
      <LineGraph
        title={t("home.graph.title")}
        isHeaderDetail={true}
        data={userPaymentHistory}
      />
    </div>
  );
};

export default HomePayment;
