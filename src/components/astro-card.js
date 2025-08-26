"use client"

import { useState } from "react";

const AstroCard = ({ astro }) => {
    const [imgError, setImgError] = useState(false);

    return (
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col" aria-label={astro.name}>
        <div className="md:col-span-1 bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center h-96">

          {astro.image_url && !imgError ? (
            <img
              src={astro.image_url}
              alt={`${astro.name} headshot`}
              loading="lazy"
              className="w-full h-full object-cover object-center block"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-64 md:h-full flex items-center justify-center text-white px-4">
              No image uploaded
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{astro.name}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">Age: {astro.age ?? "—"}</div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{astro.agency_abbrev} • {astro.agency}</div>

          <div className="mt-3 text-sm text-gray-700 dark:text-gray-200 flex-1">
            <p className="line-clamp-6">{astro.bio || "No bio available."}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-100">Time in Space</div>
              <div>{astro.time_in_space ?? "—"}</div>
            </div>
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-100">EVA Time | Space Walks</div>
              <div>{astro.eva_time ?? "—"} • {astro.spacewalks_count ?? 0}</div>
            </div>
          </div>

          <div className="mt-4">
            {astro.wiki && (
              <a
                href={astro.wiki}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Learn more
              </a>
            )}
          </div>
        </div>
      </article>
    );
  };

export default AstroCard;
