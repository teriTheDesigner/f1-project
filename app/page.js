"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "../app/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="flex flex-col">
      <div
        style={{
          backgroundImage: `url(/jeddah.jpg)`,
        }}
        className="w-full h-[38rem] bg-center bg-cover relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-black"></div>
        <div className="h-[38rem] flex relative z-10 flex-col justify-center">
          <h1 className="text-7xl text-white font-extrabold text-center">
            Welcome <br />
            <span className="text-4xl mt-2 ">to the</span> <br />
            <span className="block mt-4">Ultimate F1 Experience!</span>
          </h1>
        </div>
      </div>
      <section className="p-4 pt-24 pb-24 bg-black text-white ">
        <div className=" pt-12 border-t-[13px] border-r-[13px] border-[rgba(255,255,255,0.2)] flex flex-col items-center gap-12 rounded-tr-3xl ">
          <h2 className="text-4xl w-2/3 m-auto font-bold mb-4">
            Your go-to destination for Formula 1
          </h2>
          <p className="mb-8 w-2/3 m-auto titillium-web">
            Stay updated with the latest F1 news, driver stats, and race
            schedules for the 2024 season. Join us as we follow the excitement
            of every Grand Prix!
          </p>
        </div>
      </section>

      <section className="p-4">
        <h2 className="text-3xl font-bold mb-4">Upcoming Races</h2>
      </section>

      <section className="p-4">
        <h2 className="text-3xl font-bold mb-4">Meet the Champions</h2>
      </section>
    </main>
  );
}
