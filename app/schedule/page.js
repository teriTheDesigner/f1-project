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

  const groupSessionsByCircuit = (sessions) => {
    return sessions.reduce((acc, session) => {
      const { circuit_key, circuit_short_name } = session;
      if (!acc[circuit_key]) {
        acc[circuit_key] = {
          circuit_short_name,
          sessions: [],
        };
      }
      acc[circuit_key].sessions.push(session);
      return acc;
    }, {});
  };

  // Grouping the sessions
  const groupedSessions = groupSessionsByCircuit(sessions);

  return (
    <div>
      <h1>Schedule 2024</h1>
      {Object.keys(groupedSessions).map((circuitKey) => (
        <div key={circuitKey} style={{ marginBottom: "20px" }}>
          <h2>{groupedSessions[circuitKey].circuit_short_name} </h2>
          <ul>
            {groupedSessions[circuitKey].sessions.map((session) => (
              <li key={session.session_key}>{session.session_name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
