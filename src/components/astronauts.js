"use client"

import { fetchAstronauts } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";
import AstroCard from "./astro-card";

export const Astronauts = () => {
  const [astronautData, setAstronautData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const getAstronauts = async () => {
      try {
        const data = await fetchAstronauts();
        if (mounted) setAstronautData(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to fetch astronauts", e);
        if (mounted) setAstronautData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    getAstronauts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Astronauts in Space Right Now</h2>

      {loading ? (
        <div className="text-gray-600 dark:text-gray-300">Loading astronauts…</div>
      ) : astronautData.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-300">No astronaut data available.</div>
      ) : (
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
            gap: "1rem",
          }}
        >
          {astronautData.map((astro) => (
            <AstroCard key={astro.id ?? astro.name} astro={astro} />
          ))}
        </div>
      )}
    </section>
  );
};