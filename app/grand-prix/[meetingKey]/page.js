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
        style={{ backgroundImage: `url(${imageUrl})` }}
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
      <div>
        <h3>Weekend Schedule</h3>
        {meetingData.map((session) => (
          <div key={session.session_key}>
            <p>{session.session_name}</p>
            <p>
              Start: {formatDate(session.date_start, true)} - End:{" "}
              {formatDate(session.date_end, true)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
