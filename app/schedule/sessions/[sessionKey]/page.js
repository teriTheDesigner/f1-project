"use client";

import { useEffect, useState } from "react";

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

  return (
    <div className=" p-6">
      <h2 className="text-2xl font-bold mb-4">Lap Sector Durations</h2>
      <div className="grid grid-cols-1 gap-4">
        {sessionData.map((driver) => (
          <div key={driver.driver_number} className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">
              Driver #{driver.driver_number}
            </h3>
            <p>
              <strong>Sector 1 Duration:</strong> {driver.duration_sector_1} sec
            </p>
            <p>
              <strong>Sector 2 Duration:</strong> {driver.duration_sector_2} sec
            </p>
            <p>
              <strong>Sector 3 Duration:</strong> {driver.duration_sector_3} sec
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
