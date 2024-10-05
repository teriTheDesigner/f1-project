"use client";

import { useRouter } from "next/navigation";

export default function DriverCard({ driver }) {
  const router = useRouter();

  const handleLinkClick = (driver) => {
    router.push(`/drivers/${driver}`);
  };
  return (
    <div
      key={driver.driver_number}
      className={` rounded-tr-3xl p-4 flex justify-evenly shadow-md`}
      style={{
        borderTop: `10px solid #${driver.team_colour}`,
        borderRight: `10px solid #${driver.team_colour}`,
      }}
      onClick={() => handleLinkClick(driver.driver_number)}
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
  );
}
