"use client";

import { Astronauts } from "@/components/astronauts";
import { Exoplanets } from "@/components/exoplanets";
import { Hero } from "@/components/hero";
import { SpaceWeatherNotifications } from "@/components/space-weather-notifications";

export default function Home() {

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="max-w-6xl mx-auto space-y-16">
      <div className="p-8 sm:p-16 flex flex-col items-center gap-4 bg-white dark:bg-black">
        <h1 className="text-4xl sm:text-5xl font-bold">{"Orbital, simplifying the astronomical."}</h1>
      </div>
        {/* Hero */}
        < Hero />

        {/* Astronauts */}
        < Astronauts />

        {/* Exoplanet Data (text based) */}
        {/* < Exoplanets /> */}

        {/* Space Weather Notifications */}
        {/* < SpaceWeatherNotifications /> */}
      </main>
    </div>
  );
}