"use client";

import { useEffect, useState } from "react";

export default function Schedule() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("https://api.openf1.org/v1/sessions")
      .then((response) => response.json())
      .then((data) => {
        setSessions(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching sessions data:", error));
  }, []);

  const groupSessionsByYearAndCircuit = (sessions) => {
    return sessions.reduce((acc, session) => {
      const { year, circuit_key, circuit_short_name, location, country_name } =
        session;

      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][circuit_key]) {
        acc[year][circuit_key] = {
          circuit_short_name,
          location,
          country_name,
          sessions: [],
        };
      }

      acc[year][circuit_key].sessions.push(session);

      return acc;
    }, {});
  };

  const groupedSessions = groupSessionsByYearAndCircuit(sessions);

  return (
    <div>
      <h1>Schedule</h1>

      {Object.keys(groupedSessions)
        .sort((a, b) => b - a)
        .map((year) => (
          <div key={year} style={{ marginBottom: "40px" }}>
            <h2>{year}</h2>

            {Object.keys(groupedSessions[year]).map((circuitKey) => (
              <div key={circuitKey} style={{ marginLeft: "20px" }}>
                <h3>{groupedSessions[year][circuitKey].country_name} </h3>
                <h4>{groupedSessions[year][circuitKey].location} </h4>
                <div style={{ marginBottom: "40px" }}>
                  {groupedSessions[year][circuitKey].sessions
                    .sort(
                      (a, b) => new Date(a.date_start) - new Date(b.date_start)
                    )
                    .map((session) => (
                      <p className="titillium-web" key={session.session_key}>
                        {session.session_name}
                      </p>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
