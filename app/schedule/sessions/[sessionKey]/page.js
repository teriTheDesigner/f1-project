"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import { SelectDriver1 } from "@/app/components/SelectDriver1";
import { SelectDriver2 } from "@/app/components/SelectDriver2";
import { SelectLap } from "@/app/components/SelectLap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function OneSession({ params }) {
  const { sessionKey } = params;

  const [drivers, setDrivers] = useState([]);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDriver1, setSelectedDriver1] = useState("1");
  const [selectedDriver2, setSelectedDriver2] = useState("4");
  const [selectedLap, setSelectedLap] = useState("5");

  useEffect(() => {
    if (sessionKey) {
      Promise.all([
        fetch(
          `https://api.openf1.org/v1/laps?session_key=${sessionKey}&lap_number=${selectedLap}`
        ).then((response) => response.json()),
        fetch(
          `https://api.openf1.org/v1/drivers?session_key=${sessionKey}`
        ).then((response) => response.json()),
      ])
        .then(([sessionData, allDriversData]) => {
          setSessionData(sessionData);
          setDrivers(allDriversData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [sessionKey, selectedLap]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionData || sessionData.length === 0) {
    return <div>No data found for this event.</div>;
  }

  const filteredSessionData = sessionData.filter((driver) =>
    [selectedDriver1, selectedDriver2].includes(driver.driver_number)
  );

  const driverMap = drivers.reduce((acc, driver) => {
    acc[driver.driver_number] = driver.full_name;
    return acc;
  }, {});

  // Prepare data for the chart only if drivers are selected
  const driverNames = filteredSessionData.map(
    (driver) =>
      driverMap[driver.driver_number] || `Driver #${driver.driver_number}`
  );

  const sector1Durations = filteredSessionData.map(
    (driver) => driver.duration_sector_1
  );
  const sector2Durations = filteredSessionData.map(
    (driver) => driver.duration_sector_2
  );
  const sector3Durations = filteredSessionData.map(
    (driver) => driver.duration_sector_3
  );

  const data = {
    labels: driverNames, // Driver names as labels on the x-axis
    datasets: [
      {
        label: "Sector 1 Duration",
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        data: sector1Durations,
      },
      {
        label: "Sector 2 Duration",
        backgroundColor: "rgba(153,102,255,0.6)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
        data: sector2Durations,
      },
      {
        label: "Sector 3 Duration",
        backgroundColor: "rgba(255,159,64,0.6)",
        borderColor: "rgba(255,159,64,1)",
        borderWidth: 1,
        data: sector3Durations,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Driver Sector Durations Comparison",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Duration (sec)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Drivers",
        },
      },
    },
  };

  // console.log("selected Driver 1", selectedDriver1);
  // console.log("selected Driver 2", selectedDriver2);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lap Sector Durations</h2>
      <div className="flex justify-center gap-24 mb-6">
        <SelectDriver1
          sessionKey={sessionKey}
          onSelectDriver={setSelectedDriver1}
        />
        <SelectDriver2
          sessionKey={sessionKey}
          onSelectDriver={setSelectedDriver2}
        />
        <SelectLap sessionKey={sessionKey} />
      </div>

      {selectedDriver1 && selectedDriver2 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Please select two drivers to compare.</p>
      )}
    </div>
  );
}
