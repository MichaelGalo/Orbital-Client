"use client"

import { fetchHeroImage } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";
import Modal from "./modal";

export const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getHeroImage = async () => {
      const response = await fetchHeroImage();
      setHeroData(response[0]);
    };

    getHeroImage();
  }, []);

  const formattedDate = heroData?.date ? new Date(heroData?.date).toLocaleDateString() : null;

  return (
    <section className="max-w-7xl mx-auto">
      <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* left: media */}
          <div className="md:col-span-1 bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center">
            {heroData?.url ? (
              <img
                src={heroData?.url}
                alt={heroData?.title || "NASA Picture of the Day"}
                className="w-full h-64 md:h-full object-cover block"
              />
            ) : (
              <div className="w-full h-64 md:h-full flex items-center justify-center text-white px-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold">NASA Video</div>
                  <div className="text-sm mt-1">Current Media Type Unsupported. Click the 'view full media' button to view.</div>
                </div>
              </div>
            )}
          </div>

          {/* right: content */}
          <div className="md:col-span-2 p-6 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                  {heroData?.title || "NASA Picture"}
                </h2>

                {formattedDate && (
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {formattedDate}
                  </div>
                )}
              </div>

              <div className="mt-3 text-base text-gray-700 dark:text-gray-200 max-w-prose">
                {heroData?.explanation ? (
                  <p className="line-clamp-none">{heroData?.explanation}</p>
                ) : (
                  <p>Simplifying the astronomical.</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">NASA APOD</span>
                {heroData?.copyright && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">© {heroData?.copyright}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {heroData?.url ? (
                  <button
                    onClick={() => setOpen(true)}
                    aria-label="View full image"
                    className="inline-block px-3 py-2 bg-sky-600 text-white text-xs rounded hover:bg-sky-700 transition"
                  >
                    View full media
                  </button>
                ) : (
                  <a
                    href={"https://apod.nasa.gov/apod/astropix.html"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-2 border border-gray-200 dark:border-gray-700 text-xs rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    View Media at NASA
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to display full image only */}
      {open && heroData?.url && (
        <Modal isOpen={open} onClose={() => setOpen(false)} className="max-w-5xl" ariaLabel={heroData?.title}>
          <div className="w-full flex items-center justify-center">
            <img
              src={heroData?.url}
              alt={heroData?.title || "NASA Picture of the Day"}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </Modal>
      )}
    </section>
  );
};
