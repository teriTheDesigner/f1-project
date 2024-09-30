"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Schedule() {
  const [sessions, setSessions] = useState([]);
  const router = useRouter();

  const handleLinkClick = (meetingKey) => {
    router.push(`/grand-prix/${meetingKey}`);
  };

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
      img: "/imola.jpg",
    },
    {
      location: "Spa-Francorchamps",
      img: "/Spa-Francorchamps.jpg",
    },
    {
      location: "Melbourne",
      img: "/melbourne.jpg",
    },
    {
      location: "Barcelona",
      img: "/barcelona.jpg",
    },
    {
      location: "Spielberg",
      img: "/spielberg.jpg",
    },
    {
      location: "Monaco",
      img: "/monaco.jpg",
    },
    {
      location: "Montréal",
      img: "/montreal.jpg",
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
      img: "/shanghai.jpg",
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
      img: "/sakhir.jpg",
    },
    {
      location: "Baku",
      img: "/baku.jpg",
    },
    {
      location: "Jeddah",
      img: "/jeddah.jpg",
    },
    {
      location: "Miami",
      img: "/miami.jpg",
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

  const groupSessionsByYearAndMeeting = (sessions) => {
    return sessions.reduce((acc, session) => {
      const {
        year,
        meeting_key,
        circuit_short_name,
        location,
        country_name,
        date_end,
        date_start,
        gmt_offset,
        session_key,
        session_name,
        session_type,
      } = session;

      if (!acc[year]) {
        acc[year] = {};
      }

      // Use meeting_key to group sessions under the same event
      if (!acc[year][meeting_key]) {
        acc[year][meeting_key] = {
          circuit_short_name,
          location,
          country_name,
          date_end,
          date_start,
          gmt_offset,
          meeting_key,
          sessions: [],
        };
      }

      // Add session to the corresponding meeting_key
      acc[year][meeting_key].sessions.push(session);

      return acc;
    }, {});
  };

  const groupedSessions = groupSessionsByYearAndMeeting(sessions);

  console.log("all grouped sessions", groupedSessions);

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

            {Object.keys(groupedSessions[year]).map((meetingKey) => {
              const meeting = groupedSessions[year][meetingKey];

              return (
                <div
                  key={meetingKey}
                  className="border p-4 pointer rounded-xl shadow-sm"
                  onClick={() => handleLinkClick(meeting.meeting_key)}
                >
                  <img
                    src={getImageForLocation(meeting.location)}
                    alt={`Image of ${meeting.location}`}
                  />
                  <div className="flex flex-col gap-2 mt-3">
                    <h3 className="text-xl">{meeting.country_name}</h3>
                    <h4 className="titillium-web uppercase text-sm">
                      {meeting.location}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
}
