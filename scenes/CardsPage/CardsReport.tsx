"use client";

import "@/sass/scenes/_cardsReport.scss";

import LineGraph from "@/shared/LineGraph/LineGraph";

import { cardReport } from "@/db/card";

import { useTranslation } from "@/i18n/client";

const CardsReport = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);

  return (
    <div className="cards__report">
      <LineGraph
        title={`${t("cards.report.title")}`}
        isHeaderDetail={false}
        data={cardReport}
      />
    </div>
  );
};

export default CardsReport;
