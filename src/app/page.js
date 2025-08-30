"use client";

import { Astronauts } from "@/components/astronauts";
import { Exoplanets } from "@/components/exoplanets";
import { Hero } from "@/components/hero";
import { SpaceWeatherNotifications } from "@/components/space-weather-notifications";

export default function Home() {

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="max-w-6xl mx-auto space-y-16">
      <div className="p-6 sm:p-10 flex flex-col items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 text-center">{"Orbital, simplifying the astronomical."}</h1>
      </div>
        < Hero />
        < Astronauts />
        < SpaceWeatherNotifications />
        < Exoplanets />
      </main>
    </div>
  );
}