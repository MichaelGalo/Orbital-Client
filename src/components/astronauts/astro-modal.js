"use client"

import React from "react";
import Modal from "../modal";

const AstroModal = ({ astro, onClose }) => {
  if (!astro) return null;

  return (
    <Modal isOpen={!!astro} onClose={onClose} title={astro.name}>
      <div className="text-sm text-gray-800 dark:text-gray-200">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{astro.agency_abbrev} • {astro.agency}</div>

        <div className="space-y-4">
          <div>
            <strong className="block">Bio</strong>
            <p className="whitespace-pre-line mt-2">{astro.bio || "No bio available."}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium">Time in Space</div>
              <div>{astro.time_in_space ?? "—"}</div>
            </div>
            <div>
              <div className="font-medium">EVA Time • Space Walks</div>
              <div>{astro.eva_time ?? "—"} • {astro.spacewalks_count ?? 0}</div>
            </div>
          </div>

          {astro.wiki && (
            <a href={astro.wiki} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline block">
              Open Wikipedia page
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AstroModal;
