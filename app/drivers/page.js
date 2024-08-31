"use client";

import { useEffect, useState } from "react";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("https://api.openf1.org/v1/drivers?session_key=9582")
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
      })
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  return (
    <main className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div
            key={driver.driver_number}
            className={`border rounded-lg p-4 flex flex-col items-center justify-center shadow-md`}
            style={{ backgroundColor: `#${driver.team_colour}` }}
          >
            <img
              src={driver.headshot_url}
              alt={`${driver.full_name} headshot`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{driver.full_name}</h2>
            <p className="text-sm text-gray-800">Team: {driver.team_name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
