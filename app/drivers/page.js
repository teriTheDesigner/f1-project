"use client";

import { useEffect, useState } from "react";
import DriverCard from "../components/DriverCard";

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
          <DriverCard driver={driver} />
        ))}
      </div>
    </main>
  );
}
