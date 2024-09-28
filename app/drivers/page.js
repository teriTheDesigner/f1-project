"use client";

import { useEffect, useState } from "react";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("https://api.openf1.org/v1/drivers?session_key=9582")
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  return (
    <main className="p-4">
      <h1 className="lg:text-7xl text-3xl mt-10 font-extrabold border-t-[13px] border-r-[13px] border-black rounded-tr-3xl mb-12">
        🏁 F1 Drivers 2024
      </h1>
      <p className="titillium-web bg-slate-100 p-5 rounded-xl text-slate-600 mb-12 text-sm">
        Explore the official F1 line-up for this season with a detailed
        breakdown of all drivers, points, and current standings. Stay updated
        with your favorite F1 drivers, both on and off the track.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {drivers.map((driver) => (
          <div
            key={driver.driver_number}
            className={` rounded-tr-3xl p-4 flex justify-evenly shadow-md`}
            style={{
              borderTop: `10px solid #${driver.team_colour}`,
              borderRight: `10px solid #${driver.team_colour}`,
            }}
          >
            {" "}
            <img
              src={driver.headshot_url}
              alt={`${driver.full_name} headshot`}
              className="w-32 h-32  mb-4"
            />
            <div className="flex-col items-center justify-center">
              <p className="text-4xl">{driver.driver_number}</p>

              <h2 className="text-lg font-semibold mt-6">{driver.full_name}</h2>
              <p className="text-sm text-gray-800">Team: {driver.team_name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
