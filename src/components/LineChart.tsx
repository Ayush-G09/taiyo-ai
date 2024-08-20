import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchCovidData = async () => {
  const { data } = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return data;
};

function LineChart() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["covidChartData"],
    queryFn: fetchCovidData,
  });

  const labels = data?.cases ? Object.keys(data.cases) : [];
  const caseData = data?.cases ? Object.values(data.cases) : [];

  // Data for the chart
  const cdata = {
    labels: labels,
    datasets: [
      {
        label: "Covid Cases",
        data: caseData,
        fill: false,
        borderColor: "#4bc0c0",
        tension: 0.1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Cases: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="bg-[#26252B] w-4/5 h-[500px] p-10 rounded-lg">
      {isLoading && (
        <div className="w-auto h-full flex items-center justify-center">
          <HashLoader size={150} color="#3B82F6" />
        </div>
      )}
      {!isLoading && !error && <Line data={cdata} options={options} />}
      {error && (
        <div className="w-auto h-full flex flex-col items-center justify-center gap-5">
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-red-500 w-10 h-10"
          />
          <label className="text-lg text-white font-semibold">
            Error in getting the data
          </label>
          <Button
            sx={"w-[10%] h-10 bg-red-500 hover:bg-red-400"}
            onClick={refetch}
            placeholder={"Retry"}
          />
        </div>
      )}
    </div>
  );
};

export default LineChart;
