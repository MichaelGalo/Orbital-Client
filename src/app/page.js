"use client";

import { Astronauts } from "@/components/astronauts";
import { fetchExoplanetsData, fetchHeroImage, fetchSpaceWeatherAlerts } from "@/services/fetch-datasets";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [hero_image, setHeroImage] = useState();
  const [exoplanets_data, setExoplanetsData] = useState();
  const [space_weather_alerts, setSpaceWeatherAlerts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroImage, exoplanets, spaceWeather] = await Promise.all([
          fetchHeroImage(),
          fetchExoplanetsData(),
          fetchSpaceWeatherAlerts(),
        ]);
        setHeroImage(heroImage);
        setExoplanetsData(exoplanets);
        setSpaceWeatherAlerts(spaceWeather);
        setAstronauts(astronauts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="max-w-6xl mx-auto space-y-16">
        {/* Hero */}
        <section className="relative rounded-lg overflow-hidden shadow-lg">
          <img
            src={hero_image}
            alt="Hero background"
            className="absolute inset-0 w-full h-64 sm:h-96 object-cover opacity-80 dark:opacity-60"
          />
          <div className="relative z-10 p-8 sm:p-16 flex flex-col items-start gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Welcome to Orbital Client</h1>
            <p className="text-lg">Simplifying the astronomical.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 dark:to-black/40 pointer-events-none" />
        </section>

        {/* Astronauts */}
        < Astronauts />

        {/* Exoplanet Data (text based) */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Exoplanet Data</h2>
          <div className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            {exoplanets_data.map((p) => (
              <div key={p.id}>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Space Weather Notifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Space Weather Notifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {space_weather_alerts.map((s) => (
              <div key={s.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{s.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.level}</p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{s.time || ""}</div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{s.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}