"use client";
import React from "react";

export const ExoplanetModal = ({ selectedPlanet, onClose }) => {
  const original = typeof selectedPlanet === "string" ? (() => {
    try { return JSON.parse(selectedPlanet); } catch { return { value: selectedPlanet }; }
  })() : selectedPlanet || {};

  const fmt = (val) => {
    if (val === null || val === undefined || val === "") return "—";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    return String(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6 overflow-auto" style={{ maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{fmt(original.planet_name || original.name || 'Unnamed')}</h3>
          </div>
          <button aria-label="Close" className="ml-4 text-gray-700 dark:text-gray-200 hover:text-gray-900" onClick={onClose}>×</button>
        </div>

        <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <div className="sm:col-span-2 mt-2">
              <details className="text-xs text-gray-600 dark:text-gray-400">
                <summary className="cursor-pointer">Show raw data</summary>
                <pre className="mt-2 whitespace-pre-wrap text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">{JSON.stringify(original, null, 2)}</pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExoplanetModal;
