import React from "react";
import LineChart from "../components/LineChart";
import CovidMap from "../components/CovidMap";

function ChartsAndMaps() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-6 overflow-hidden overflow-y-scroll scrollbar-hide py-8">
      <label className="text-white text-lg">
        Line graph showing the cases fluctuations
      </label>
      <LineChart />
      <label className="text-white text-lg">Leaflet Map</label>
      <div className="bg-[#26252B] w-4/5 p-10 rounded-lg">
        <CovidMap />
      </div>
    </div>
  );
}

export default ChartsAndMaps;
