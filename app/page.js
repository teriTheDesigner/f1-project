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
      <h1 className="text-7xl mt-10 font-extrabold m-auto mb-6">
        Helloo to all F1 Fans!
      </h1>
      <img src="/LasVegas.jpg" alt="las vegas"></img>
    </main>
  );
}
