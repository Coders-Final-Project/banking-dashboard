import React from "react";

import "@/sass/scenes/_loading.scss";

const Loading = () => {
  return (
    <div className="spinner">
      Yüklənir
      <div className="spinner-sector spinner-sector-red"></div>
      <div className="spinner-sector spinner-sector-blue"></div>
      <div className="spinner-sector spinner-sector-green"></div>
    </div>
  );
};

export default Loading;
