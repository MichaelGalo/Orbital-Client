"use client";
import React, { useEffect, useState } from "react";
import { fetchBatchedExoplanets } from "@/services/fetch-datasets";
import ExoplanetHistogram from "./exoplanet-histogram";
import { InspectExoplanets } from "./inspect-exoplanets";

const Exoplanets = () => {
    const [allExoplanets, setAllExoplanets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchBatchedExoplanets(1000).then((allResults) => {
            setAllExoplanets(allResults);
            setIsLoading(false);
        });
    }, []);

    return (
        <section>
        <h1 className="text-3xl font-bold mb-4">Exoplanets</h1>

        {/* Histogram: number of discoveries by year */}
        <div className="mb-6">
          {/* derive numeric discovery years from the full dataset */}
          <ExoplanetHistogram
            data={allExoplanets
              .map((planet) => {
                const y = Number(planet.discovery_year);
                return Number.isFinite(y) ? y : NaN;
              })
              .filter((value) => !Number.isNaN(value))}
            width={900}
            height={300}
            bins={Math.min(new Set(allExoplanets.map((planet) => planet.discovery_year).filter(Boolean)).size || 10, 80)}
          />
        </div>

            <InspectExoplanets allExoplanets={allExoplanets} isLoading={isLoading} />
        </section>
    );
};

export default Exoplanets;