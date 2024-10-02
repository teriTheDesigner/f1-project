"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
export default function GrandPrix({ params }) {
  let imageUrl = "/jeddah.jpg";

  const { meetingKey } = params;
  // console.log("Meeting Key:", meetingKey);
  const [meetingData, setMeetingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

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
  console.log(round);

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
  const firstSessionStart = meetingData[0].date_start;
  const lastSessionEnd = meetingData[meetingData.length - 1].date_end;

  return (
    <div>
      <div
        className="w-full h-[38rem] bg-center bg-cover relative"
        style={{
          backgroundImage: `url(${getImageForLocation(
            meetingData[0].location
          )})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

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
      <div className="mt-6 ">
        <h3 className="text-4xl">Weekend Schedule</h3>
        {meetingData.map((session) => (
          <div key={session.session_key} className="flex flex-col">
            <p className="mt-6">{session.session_name}</p>
            <p className="titillium-web uppercase text-sm">
              {formatDate(session.date_start, true)} -{" "}
              {formatDate(session.date_end, true)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
