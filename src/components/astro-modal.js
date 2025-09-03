"use client"

import { useEffect, useRef } from "react";

const AstroModal = ({ astro, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    // prevent background scroll while modal open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const onOverlayClick = (event) => {
    if (event.target === overlayRef.current) onClose();
  };

  if (!astro) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto max-h-[90vh]">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{astro.name}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">{astro.agency_abbrev} • {astro.agency}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close"
              className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 text-sm text-gray-800 dark:text-gray-200">
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
    </div>
  );
};

export default AstroModal;
