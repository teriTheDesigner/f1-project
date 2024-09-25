"use client";

import { useEffect, useState } from "react";

export default function Schedule() {
  const [sessions, setSessions] = useState([]);

  const locations = [
    {
      location: "Silverstone",
      img: "/UAE.jpg",
    },
    {
      location: "Budapest",
      img: "/LasVegas.jpg",
    },
    {
      location: "Imola",
      img: "/UAE.jpg",
    },
    {
      location: "Spa-Francorchamps",
      img: "/UAE.jpg",
    },
    {
      location: "Melbourne",
      img: "/UAE.jpg",
    },
    {
      location: "Barcelona",
      img: "/LasVegas.jpg",
    },
    {
      location: "Spielberg",
      img: "/LasVegas.jpg",
    },
    {
      location: "Monaco",
      img: "/UAE.jpg",
    },
    {
      location: "Montréal",
      img: "/UAE.jpg",
    },
    {
      location: "Monza",
      img: "/LasVegas.jpg",
    },
    {
      location: "Suzuka",
      img: "/UAE.jpg",
    },
    {
      location: "Shanghai",
      img: "/UAE.jpg",
    },
    {
      location: "Zandvoort",
      img: "/LasVegas.jpg",
    },
    {
      location: "Marina Bay",
      img: "/UAE.jpg",
    },
    {
      location: "Sakhir",
      img: "/UAE.jpg",
    },
    {
      location: "Baku",
      img: "/UAE.jpg",
    },
    {
      location: "Jeddah",
      img: "/UAE.jpg",
    },
    {
      location: "Miami",
      img: "/LasVegas.jpg",
    },
    {
      location: "Austin",
      img: "/UAE.jpg",
    },
    {
      location: "São Paulo",
      img: "/UAE.jpg",
    },
    {
      location: "Mexico City",
      img: "/UAE.jpg",
    },
    {
      location: "Yas Island",
      img: "/UAE.jpg",
    },
    {
      location: "Lusail",
      img: "/UAE.jpg",
    },
    {
      location: "Las Vegas",
      img: "/LasVegas.jpg",
    },
  ];

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
  const getImageForLocation = (location) => {
    const locationObj = locations.find((loc) => loc.location === location);
    return locationObj ? locationObj.img : "/default.jpg";
  };

  return (
    <div>
      <h1>Schedule</h1>

      {Object.keys(groupedSessions)
        .sort((a, b) => b - a)
        .map((year) => (
          <div key={year} className="grid grid-cols-3 gap-4 mb-10">
            <h2 className="col-span-3 text-xl font-bold">{year}</h2>

            {Object.keys(groupedSessions[year]).map((circuitKey) => (
              <div key={circuitKey} className="border p-4 rounded shadow-sm">
                <img
                  src={getImageForLocation(
                    groupedSessions[year][circuitKey].location
                  )}
                  alt={`Image of ${groupedSessions[year][circuitKey].location}`}
                  className="w-full h-auto"
                />
                <h3>{groupedSessions[year][circuitKey].country_name} </h3>
                <h4>{groupedSessions[year][circuitKey].location} </h4>
                {/* <div style={{ marginBottom: "40px" }}>
                  {groupedSessions[year][circuitKey].sessions
                    .sort(
                      (a, b) => new Date(a.date_start) - new Date(b.date_start)
                    )
                    .map((session) => (
                      <p className="titillium-web" key={session.session_key}>
                        {session.session_name}
                      </p>
                    ))}
                </div> */}
                {/* <div style={{ marginBottom: "40px" }}>
                  {groupedSessions[year][circuitKey].sessions
                    .sort(
                      (a, b) => new Date(a.date_start) - new Date(b.date_start)
                    )
                    .map((session) => (
                      <p className="titillium-web" key={session.session_key}>
                        {session.session_name}
                      </p>
                    ))}
                </div> */}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
