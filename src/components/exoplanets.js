import { fetchExoplanetsData } from "@/services/fetch-datasets";
import { useEffect, useRef, useState } from "react";

export const Exoplanets = () => {
  const PAGE_SIZE = 50;

  // UI state
  const [page, setPage] = useState(0); // zero-indexed pages
  const [exoplanetsData, setExoplanetsData] = useState([]);
  const [expandedPlanet, setExpandedPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // request id to ignore stale responses
  const requestIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const currentRequestId = ++requestIdRef.current;

    const loadPage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const offset = page * PAGE_SIZE;
        const data = await fetchExoplanetsData(offset, PAGE_SIZE);
        console.log(data)
        // ignore stale responses
        if (cancelled || currentRequestId !== requestIdRef.current) return;

        setExoplanetsData(data || []);
        // if returned fewer than PAGE_SIZE, we reached the end
        setHasMore(Array.isArray(data) ? data.length === PAGE_SIZE : false);
      } catch (err) {
        if (!cancelled) setError(err.message || String(err));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadPage();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const goNext = () => {
    if (!hasMore) return;
    setPage((p) => p + 1);
  };

  const goPrev = () => {
    setPage((p) => Math.max(0, p - 1));
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Exoplanet Data</h2>

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
              Next 50
            </button>
          </div>
        </div>

        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {error && <div className="text-sm text-red-500">Error: {error}</div>}

        <div>
          {exoplanetsData.length === 0 && !isLoading && !error ? (
            <div className="text-sm text-gray-500">No exoplanets found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-sm"
                  >
                    <h3 className="font-semibold text-lg mb-1">{planet.planet_name || "Unnamed"}</h3>

                    <div className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
                    <div>
                      <strong className="text-sm text-gray-600 dark:text-gray-300 mb-2">Discovery Year: </strong>
                      {discovery_year}
                    </div>
                      <div>
                        <strong className="mr-1 text-gray-600 dark:text-gray-300">Controversial Flag:</strong>
                        {controversial_flag}
                      </div>
                      <div>
                        <strong className="mr-1 text-gray-600 dark:text-gray-300">Discovery Facility:</strong>
                        {discovery_facility}
                      </div>
                      <div>
                        <strong className="mr-1 text-gray-600 dark:text-gray-300">Discovery Instrument:</strong>
                        {discovery_instrument}
                      </div>
                      <div>
                        <strong className="mr-1 text-gray-600 dark:text-gray-300">Discovery Method:</strong>
                        {discovery_method}
                      </div>
                      <div>
                        <strong className="mr-1 text-gray-600 dark:text-gray-300">Orbital Period (days):</strong>
                        {orbital_period_days}
                      </div>
                      <div>
                        <strong className="mr-1 text-gray-600 dark:text-gray-300">Orbital Semi-Major Axis (AU):</strong>
                        {orbital_semi_major_axis_in_au}
                      </div>
                      <div>
                        <strong className="mr-1 text-gray-600 dark:text-gray-300">Radius (Earth Radii):</strong>
                        {radius_earth_radii}
                      </div>
                      <div>
                        <strong className="mr-1 text-gray-600 dark:text-gray-300">Star Radius (Solar Radii):</strong>
                        {star_radius_solar_radii}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <button
                        onClick={() => setExpandedPlanet(prev => (prev === id ? null : id))}
                        className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700"
                      >
                        {expandedPlanet === id ? "Hide details" : "Show details"}
                      </button>
                      <div className="text-xs text-gray-400">#{page * PAGE_SIZE + (index + 1)}</div>
                    </div>

                    {expandedPlanet === id && (
                      <pre className="mt-3 max-h-48 overflow-auto text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded">
                        {JSON.stringify(planet, null, 2)}
                      </pre>
                    )}
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
              Next 50
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
