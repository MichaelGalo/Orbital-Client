"use client";
import { fetchBatchedExoplanets } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";
import Modal from "../modal";

export const InspectExoplanets = () => {
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

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Inspect Exoplanets</h2>

        <div className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-700 dark:text-gray-300">
              Page {page + 1} / {Math.ceil(allExoplanets.length / page_size)}
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

  {/* Modal for selected planet (inlined) */}
  {selectedPlanet && (
    <Modal
      isOpen={!!selectedPlanet}
      onClose={() => setSelectedPlanet(null)}
      title={
        (function formatValue(v) {
          if (v === null || v === undefined || v === "") return "—";
          return String(v);
        })(selectedPlanet.planet_name || selectedPlanet.name || "Unnamed")
      }
    >
      {(() => {
        const formatValue = (value) => {
          if (value === null || value === undefined || value === "") return "—";
          return String(value);
        };

        const formatControversial = (value) => {
          if (value === 0) return "False, the discovery of this exoplanet is not disputed by the Space Community.";
          if (value === 1) return "True, the discovery of this exoplanet is disputed by the Space Community.";
          if (value === null || value === undefined || value === "") return "-";
        };

        return (
          <div className="mt-0 bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-500">Discovery year</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatValue(selectedPlanet.discovery_year)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Discovery method</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatValue(selectedPlanet.discovery_method)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Discovery facility</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatValue(selectedPlanet.discovery_facility)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Instrument</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatValue(selectedPlanet.discovery_instrument)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Controversial?</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatControversial(selectedPlanet.controversial_flag)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Orbital period (days)</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatValue(selectedPlanet.orbital_period_days)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Semi-major axis (AU)</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatValue(selectedPlanet.orbital_semi_major_axis_in_au)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Radius (Earth radii)</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatValue(selectedPlanet.radius_earth_radii)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Star radius (Solar radii)</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{formatValue(selectedPlanet.star_radius_solar_radii)}</div>
              </div>
            </div>
          </div>
        );
      })()}
    </Modal>
  )}
    </>
  );
};
