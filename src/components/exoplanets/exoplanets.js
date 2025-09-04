"use client";
import React, { useEffect, useState } from "react";
import { fetchBatchedExoplanets } from "@/services/fetch-datasets";
import { InspectExoplanets } from "./inspect-exoplanets";
import ExoplanetsCharts from "./exoplanets-charts";

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
            <h1 className="text-3xl font-bold mb-4">Exoplanets</h1>
            <div className="mb-4 text-gray-700 dark:text-gray-300">
            We've detected {allExoplanets.length} exoplanets so far! Explore the distributions of their discovery years and sizes below.
            </div>
            <ExoplanetsCharts allExoplanets={allExoplanets} />
            <InspectExoplanets allExoplanets={allExoplanets} isLoading={isLoading} />
        </section>
    );
};

export default Exoplanets;