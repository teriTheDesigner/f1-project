"use client";

import { useEffect, useState } from "react";

export default function Schedule() {
  const [sessions, setSessions] = useState([]);

  const locations = [
    {
      location: "Silverstone",
      img: "/silverstone.jpg",
    },
    {
      location: "Budapest",
      img: "/Budapest.jpg",
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
      img: "/LasVegas2.jpg",
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
      img: "/monza1.jpg",
    },
    {
      location: "Suzuka",
      img: "/suzuka.jpg",
    },
    {
      location: "Shanghai",
      img: "/UAE.jpg",
    },
    {
      location: "Zandvoort",
      img: "/zandvoort.jpg",
    },
    {
      location: "Marina Bay",
      img: "/marinabay.jpg",
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
      img: "/austin.jpg",
    },
    {
      location: "São Paulo",
      img: "/SaoPaulo.jpg",
    },
    {
      location: "Mexico City",
      img: "/MexicoCity.jpg",
    },
    {
      location: "Yas Island",
      img: "/UAE.jpg",
    },
    {
      location: "Lusail",
      img: "/lusail.jpg",
    },
    {
      location: "Las Vegas",
      img: "/LasVegas2.jpg",
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
                />
                <div className="flex flex-col gap-2 mt-3">
                  <h3 className="text-xl">
                    {groupedSessions[year][circuitKey].country_name}{" "}
                  </h3>
                  <h4 className="titillium-web uppercase text-sm">
                    {groupedSessions[year][circuitKey].location}{" "}
                  </h4>
                </div>
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
