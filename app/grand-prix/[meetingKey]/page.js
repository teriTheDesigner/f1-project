"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function GrandPrix({ params }) {
  const { meetingKey } = params;
  // console.log("Meeting Key:", meetingKey);
  const [meetingData, setMeetingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (meetingKey) {
      // console.log("Meeting Key:", meetingKey);

      fetch(`https://api.openf1.org/v1/sessions?meeting_key=${meetingKey}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          setMeetingData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
          setLoading(false);
        });
    }
  }, [meetingKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!meetingData || meetingData.length === 0) {
    return <div>No data found for this event.</div>;
  }
  const round = searchParams.get("round") || "N/A";

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

  const handleLinkClick = (sessionKey) => {
    router.push(`/schedule/sessions/${sessionKey}`);
  };

  const getImageForLocation = (location) => {
    const locationObj = locations.find((loc) => loc.location === location);
    return locationObj ? locationObj.img : "/default.jpg";
  };

  const formatDate = (dateString, includeTime = false) => {
    const date = new Date(dateString);
    if (includeTime) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // timeZoneName: "short",
      }).format(date);
    } else {
      return new Intl.DateTimeFormat("en-US", {
        // year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const firstSessionStart = meetingData[0].date_start;
  const lastSessionEnd = meetingData[meetingData.length - 1].date_end;

  const sessionsByDay = meetingData.reduce((acc, session) => {
    const day = formatDay(session.date_start); // Get the day of the week
    if (!acc[day]) {
      acc[day] = []; // Initialize array if the day is not present
    }
    acc[day].push(session); // Add session to the correct day
    return acc;
  }, {});

  const daysCount = Object.keys(sessionsByDay).length;
  console.log("all Sessions", sessionsByDay);
  return (
    <div className="bg-black">
      <div
        className="w-full h-[38rem] bg-center bg-cover relative"
        style={{
          backgroundImage: `url(${getImageForLocation(
            meetingData[0].location
          )})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-black"></div>
        <div className="h-[38rem] flex relative z-10">
          <div className="m-auto flex flex-col items-center gap-6">
            <h1 className="text-white text-7xl font-extrabold">
              {meetingData[0].location} Grand Prix
            </h1>
            <h2 className="text-white text-3xl font-normal">
              Formula 1 {meetingData[0].location} Grand Prix 2024
            </h2>
            {/* <h2 className="text-white text-3xl font-normal">
              {meetingData[0].country_name}
            </h2> */}
            <div className="flex gap-4 text-white mt-16 text-3xl font-extrabold">
              <p>ROUND {round}</p>
              <p>|</p>
              <p className="uppercase">
                {formatDate(firstSessionStart)} - {formatDate(lastSessionEnd)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white ml-10 mr-10 pb-12">
        <h3 className="text-4xl mb-4">Weekend Schedule</h3>

        <div
          className=" pt-4 border-t-[13px] border-r-[13px] border-[rgba(255,255,255,0.2)] rounded-tr-3xl "
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${daysCount}, 1fr)`,
            justifyContent: "evenly",
          }}
        >
          {Object.entries(sessionsByDay).map(([day, sessions]) => (
            <div
              key={day}
              className="flex flex-col p-6  border-dotted border-r-4 border-[rgba(255,255,255,0.2)] last:border-r-0"
            >
              <h4 className="text-2xl font-bold mb-6 border-b-4 pb-4  border-[rgba(255,255,255,0.2)]">
                {day}
              </h4>
              {sessions.map((session) => (
                <div
                  key={session.session_key}
                  onClick={() => handleLinkClick(session.session_key)}
                  className="mb-6 flex flex-col gap-3 p-4 rounded-lg border-[rgba(255,255,255,0.2)] border-2 cursor-pointer hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <p className="text-xl">{session.session_name}</p>
                  <p className="titillium-web uppercase  text-[rgba(255,255,255,0.5)]">
                    {formatTime(session.date_start)} -{" "}
                    {formatTime(session.date_end)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
