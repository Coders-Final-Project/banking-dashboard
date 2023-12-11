"use client";

import "@/sass/scenes/_cardsReport.scss";

import LineGraph from "@/shared/LineGraph/LineGraph";

import { cardReport } from "@/db/card";

import { useSelector } from "react-redux";

import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

const CardsReport = () => {
  const curLang = useSelector((state: StateProps) => state.curLang);

  const { t } = useTranslation(curLang);

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
