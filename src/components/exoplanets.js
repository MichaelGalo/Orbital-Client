"use client";
import { fetchExoplanetsData } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";

export const Exoplanets = () => {
  const PAGE_SIZE = 15;

  const [page, setPage] = useState(0);
  const [exoplanetsData, setExoplanetsData] = useState([]);
  const [allExoplanets, setAllExoplanets] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const batchSize = 1000;
        const allResults = [];
        for (let currentOffset = 0; ; currentOffset += batchSize) {
          const batch = await fetchExoplanetsData(currentOffset, batchSize);
          if (cancelled) return;
          if (!Array.isArray(batch) || batch.length === 0) break;
          allResults.push(...batch);
          if (batch.length < batchSize) break;
        }
        setAllExoplanets(allResults);
        setExoplanetsData(allResults.slice(0, PAGE_SIZE));
        setHasMore(allResults.length > PAGE_SIZE);
      } catch (err) {
        if (!cancelled) setError(err.message || String(err));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // update page slice when page or allExoplanets changes
  useEffect(() => {
    if (!allExoplanets) return;
    const startIndex = page * PAGE_SIZE;
    setExoplanetsData(allExoplanets.slice(startIndex, startIndex + PAGE_SIZE));
    setHasMore(allExoplanets.length > startIndex + PAGE_SIZE);
  }, [page, allExoplanets]);

  const goNext = () => {
    if (!hasMore) return;
  setPage((prevPage) => prevPage + 1);
  };

  const goPrev = () => {
  setPage((prevPage) => Math.max(0, prevPage - 1));
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
                const id = planet.planet_name || String(index);
                const planet_name = planet.planet_name;
                const discovery_year = planet.discovery_year;
                const controversial_flag = planet.controversial_flag;
                const discovery_facility = planet.discovery_facility;
                const discovery_instrument = planet.discovery_instrument;
                const discovery_method = planet.discovery_method;
                const orbital_period_days = planet.orbital_period_days;
                const orbital_semi_major_axis_in_au = planet.orbital_semi_major_axis_in_au;
                const radius_earth_radii = planet.radius_earth_radii;
                const star_radius_solar_radii = planet.star_radius_solar_radii;

                    return (
                      <article
                        key={id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedPlanet(planet)}
                        onKeyDown={(event) => event.key === "Enter" && setSelectedPlanet(planet)}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-sm cursor-pointer focus:shadow-md"
                      >
                        <h3 className="font-semibold text-lg mb-1 truncate">{planet.planet_name || "Unnamed"}</h3>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-gray-400">#{page * PAGE_SIZE + (index + 1)}</div>
                        </div>
                      </article>
                    );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500">Showing up to {PAGE_SIZE} results per page</div>
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
      </div>
  </section>

  {/* Modal for selected planet */}
    {selectedPlanet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setSelectedPlanet(null)}>
  <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6 overflow-auto" style={{ maxHeight: '80vh' }} onClick={(event) => event.stopPropagation()}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{selectedPlanet.planet_name || 'Unnamed'}</h3>
            </div>
            <button aria-label="Close" className="ml-4 text-gray-700 dark:text-gray-200 hover:text-gray-900" onClick={() => setSelectedPlanet(null)}>×</button>
          </div>

          {/* Render full object as ordered JSON string */}
          <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
            {
              (() => {
                // normalize selectedPlanet to an object (handles string payloads)
                const original = typeof selectedPlanet === 'string' ? (() => {
                  try { return JSON.parse(selectedPlanet); } catch { return { value: selectedPlanet }; }
                })() : selectedPlanet || {};

                const fmt = (val) => {
                  if (val === null || val === undefined || val === "") return '—';
                  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
                  return String(val);
                };

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-500">Name</div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{fmt(original.planet_name || original.name)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Discovery year</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.discovery_year)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Discovery method</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.discovery_method)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Discovery facility</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.discovery_facility)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Instrument</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.discovery_instrument)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Controversial?</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.controversial_flag)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Orbital period (days)</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.orbital_period_days)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Semi-major axis (AU)</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.orbital_semi_major_axis_in_au)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Radius (Earth radii)</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.radius_earth_radii)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Star radius (Solar radii)</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{fmt(original.star_radius_solar_radii)}</div>
                    </div>
                  </div>
                );
              })()
            }
          </div>
        </div>
      </div>
    )}
    </>
  );
};
