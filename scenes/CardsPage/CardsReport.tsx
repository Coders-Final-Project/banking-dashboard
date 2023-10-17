import "@/sass/scenes/_cardsReport.scss";

import LineGraph from "@/shared/LineGraph/LineGraph";

import { cardReport } from "@/db/card";

const CardsReport = () => {
  return (
    <div className="cards__report">
      <LineGraph isHeaderDetail={false} data={cardReport} />
    </div>
  );
};

export default CardsReport;
