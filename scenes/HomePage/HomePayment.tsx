import LineGraph from "@/shared/LineGraph/LineGraph";
import { userPaymentHistory } from "@/db/user";

import { useTranslation } from "@/i18n";

const HomePayment = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <LineGraph
        title={t("home.graph.title")}
        isHeaderDetail={true}
        data={userPaymentHistory}
      />
    </div>
  );
};

export default HomePayment;
