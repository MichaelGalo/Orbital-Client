"use client";
import React, { useEffect, useState } from "react";
import { fetchBatchedExoplanets } from "@/services/fetch-datasets";
import { InspectExoplanets } from "./inspect-exoplanets";
import ExoplanetsCharts from "./exoplanets-charts";
import ExoplanetGlanceInsights from "./exoplanet-glance-insights";

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
        <section className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-4">Exoplanets</h2>
            <div className="mb-8">
                <ExoplanetGlanceInsights exoplanets={allExoplanets} />
            </div>
            <ExoplanetsCharts allExoplanets={allExoplanets} />
            <InspectExoplanets allExoplanets={allExoplanets} isLoading={isLoading} />
        </section>
    );
};

export default Exoplanets;