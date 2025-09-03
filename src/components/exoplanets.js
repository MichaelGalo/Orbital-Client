"use client";
import { fetchBatchedExoplanets } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";
import ExoplanetModal from "./exoplanet-modal";

export const Exoplanets = () => {
  const page_size = 15;

  const [page, setPage] = useState(0);
  const [exoplanetsData, setExoplanetsData] = useState([]);
  const [allExoplanets, setAllExoplanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchBatchedExoplanets(1000)
      .then((allResults) => {
        setAllExoplanets(allResults);
        setExoplanetsData(allResults.slice(0, page_size));
        setHasMore(allResults.length > page_size);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const startIndex = page * page_size;
    setExoplanetsData(allExoplanets.slice(startIndex, startIndex + page_size));
    setHasMore(allExoplanets.length > startIndex + page_size);
  }, [page, allExoplanets]);

  const goNext = () => {
    if (!hasMore) return;
    setPage((page) => page + 1);
  };

  const goPrev = () => {
    setPage((page) => Math.max(0, page - 1));
  };

  // close modal on Escape
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPlanet(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Discover Exoplanets</h2>

        <div className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-700 dark:text-gray-300">
              Page {page + 1}
            </div>
            <div className="space-x-2">
              <button
                onClick={goPrev}
                disabled={page === 0 || isLoading}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={goNext}
                disabled={!hasMore || isLoading}
                className="px-3 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
              >
                Next 15
              </button>
            </div>
          </div>

        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {error && <div className="text-sm text-red-500">Error: {error}</div>}

        <div>
          {exoplanetsData.length === 0 && !isLoading && !error ? (
            <div className="text-sm text-gray-500">No exoplanets found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {exoplanetsData.map((planet, index) => {
                const keyId = planet.planet_name || String(index);

                return (
                  <article
                    key={keyId}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedPlanet(planet)}
                    onKeyDown={(event) => event.key === "Enter" && setSelectedPlanet(planet)}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-sm cursor-pointer focus:shadow-md"
                  >
                    <h3 className="font-semibold text-lg mb-1 truncate">{planet.planet_name || "Unnamed"}</h3>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-xs text-gray-400">#{page * page_size + (index + 1)}</div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
  </section>

  {/* Modal for selected planet */}
  {selectedPlanet && <ExoplanetModal selectedPlanet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />}
    </>
  );
};
