"use client";
import { useState, useMemo, useEffect } from "react";
import ExoplanetModal from "./exoplanet-model";

export default function InspectExoplanets({ allExoplanets = [] }) {
  const page_size = 15;
  const [page, setPage] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const startIndex = page * page_size;
  const exoplanetsData = useMemo(
    () => allExoplanets.slice(startIndex, startIndex + page_size),
    [allExoplanets, startIndex]
  );
  const hasMore = allExoplanets.length > startIndex + page_size;

  const goNext = () => {
    if (!hasMore) return;
    setPage((p) => p + 1);
  };

  const goPrev = () => {
    setPage((p) => Math.max(0, p - 1));
  };

  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(allExoplanets.length / page_size) - 1);
    if (page > maxPage) setPage(maxPage);
  }, [allExoplanets, page]);

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Inspect Individual Exoplanets</h2>

        <div className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Page {page + 1} / {Math.max(1, Math.ceil(allExoplanets.length / page_size))}
            </div>
            <div className="space-x-2">
              <button
                onClick={goPrev}
                disabled={page === 0}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={goNext}
                disabled={!hasMore}
                className="px-3 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
              >
                Next 15
              </button>
            </div>
          </div>

          {exoplanetsData.length === 0 ? (
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
                    onKeyDown={(event) =>
                      event.key === "Enter" && setSelectedPlanet(planet)
                    }
                    className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-sm cursor-pointer focus:shadow-md"
                  >
                    <h3 className="font-semibold text-lg mb-1 truncate">
                      {planet.planet_name || "Unnamed"}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        #{page * page_size + (index + 1)}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedPlanet && (
        <ExoplanetModal
          selectedPlanet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </>
  );
}
