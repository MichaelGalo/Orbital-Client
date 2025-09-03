"use client";
import React from "react";
import Modal from "../modal";

const ExoplanetModal = ({ selectedPlanet, onClose }) => {
  if (!selectedPlanet) return null;

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
    <Modal
      isOpen={!!selectedPlanet}
      onClose={onClose}
      title={formatValue(selectedPlanet.planet_name || selectedPlanet.name || "Unnamed")}
      size="2xl"
    >
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
    </Modal>
  );
};

export default ExoplanetModal;