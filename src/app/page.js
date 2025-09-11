import Astronauts from "@/components/astronauts/astronauts";
import Exoplanets from "@/components/exoplanets/exoplanets";
import Hero from "@/components/hero/hero";
import SpaceWeatherNotifications from "@/components/space-weather-notifications/space-weather-notifications";
import { Suspense } from "react";

export default async function Home() {

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="max-w-7xl mx-auto space-y-16">
      <div className="p-6 sm:p-10 flex flex-col items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 text-center">{"Orbital, simplifying the astronomical."}</h1>
      </div>
        <Suspense fallback={
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="animate-spin-slow">
              <circle cx="24" cy="24" r="20" stroke="#6366f1" strokeWidth="4" strokeDasharray="60 40" />
              <circle cx="24" cy="24" r="8" fill="#6366f1" className="animate-pulse" />
            </svg>
            <span className="text-lg text-indigo-400">Launching Hero...</span>
          </div>
        }>
          <Hero />
        </Suspense>
        <Suspense fallback={
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <ellipse cx="24" cy="32" rx="16" ry="8" fill="#fbbf24" className="animate-bounce" />
              <circle cx="24" cy="16" r="8" fill="#fbbf24" className="animate-pulse" />
            </svg>
            <span className="text-lg text-yellow-400">Astronauts docking...</span>
          </div>
        }>
          <Astronauts />
        </Suspense>
        <Suspense fallback={
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="12" y="20" width="24" height="8" rx="4" fill="#38bdf8" className="animate-pulse" />
              <circle cx="24" cy="24" r="20" stroke="#38bdf8" strokeWidth="2" className="animate-spin-slow" />
            </svg>
            <span className="text-lg text-sky-400">Receiving space weather...</span>
          </div>
        }>
          <SpaceWeatherNotifications />
        </Suspense>
        <Suspense fallback={
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#a3e635" strokeWidth="4" className="animate-spin" />
              <circle cx="24" cy="24" r="6" fill="#a3e635" className="animate-pulse" />
            </svg>
            <span className="text-lg text-lime-400">Scanning exoplanets...</span>
          </div>
        }>
          <Exoplanets />
        </Suspense>
      </main>
    </div>
  );
}