"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
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
  console.log(sessionKey);

  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionKey) {
      fetch(
        `https://api.openf1.org/v1/laps?session_key=${sessionKey}&lap_number=2`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          setSessionData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
          setLoading(false);
        });
    }
  }, [sessionKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionData || sessionData.length === 0) {
    return <div>No data found for this event.</div>;
  }

  // Prepare data for the chart
  const driverNumbers = sessionData.map(
    (driver) => `Driver #${driver.driver_number}`
  );
  const sector1Durations = sessionData.map(
    (driver) => driver.duration_sector_1
  );
  const sector2Durations = sessionData.map(
    (driver) => driver.duration_sector_2
  );
  const sector3Durations = sessionData.map(
    (driver) => driver.duration_sector_3
  );

  const data = {
    labels: driverNumbers, // Driver numbers as labels on the x-axis
    datasets: [
      {
        label: "Sector 1 Duration",
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        data: sector1Durations, // Sector 1 duration values
      },
      {
        label: "Sector 2 Duration",
        backgroundColor: "rgba(153,102,255,0.6)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
        data: sector2Durations, // Sector 2 duration values
      },
      {
        label: "Sector 3 Duration",
        backgroundColor: "rgba(255,159,64,0.6)",
        borderColor: "rgba(255,159,64,1)",
        borderWidth: 1,
        data: sector3Durations, // Sector 3 duration values
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lap Sector Durations</h2>
      {/* Render the Bar chart */}
      <Bar data={data} options={options} />
    </div>
  );

  //   return (
  //     <div className=" p-6">
  //       <h2 className="text-2xl font-bold mb-4">Lap Sector Durations</h2>
  //       <div className="grid grid-cols-1 gap-4">
  //         {sessionData.map((driver) => (
  //           <div key={driver.driver_number} className="border p-4 rounded">
  //             <h3 className="text-xl font-semibold mb-2">
  //               Driver #{driver.driver_number}
  //             </h3>
  //             <p className="mb-4">
  //               <strong>LAP Duration:</strong> {driver.lap_duration} sec
  //             </p>
  //             <p>
  //               <strong>Sector 1 Duration:</strong> {driver.duration_sector_1} sec
  //             </p>
  //             <p>
  //               <strong>Sector 2 Duration:</strong> {driver.duration_sector_2} sec
  //             </p>
  //             <p>
  //               <strong>Sector 3 Duration:</strong> {driver.duration_sector_3} sec
  //             </p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
}
