import Image from "next/image";
import { fetchHeroImage } from "@/services/fetch-datasets";
import HeroModalTrigger from "./hero-modal";

export default async function Hero() {
  const data = await fetchHeroImage(); 
  const heroData = data[0];
  const formattedDate = heroData?.date
    ? new Date(heroData.date).toLocaleDateString()
    : null;

  return (
    <section className="max-w-7xl mx-auto">
      <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* left: media */}
          <div className="md:col-span-1 bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center">
            {heroData?.url ? (
              <Image
                src={heroData.url}
                alt={heroData?.title || "NASA Picture of the Day"}
                className="w-full h-64 md:h-full object-cover block"
                unoptimized
                width={400}
                height={600}
                priority
              />
            ) : (
              <div className="w-full h-64 md:h-full flex items-center justify-center text-white px-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold">NASA Video</div>
                  <div className="text-sm mt-1">
                    Current Media Type Unsupported. Click the 'view full media'
                    button to view.
                  </div>
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
                  <p>{heroData.explanation}</p>
                ) : (
                  <p>Simplifying the astronomical.</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                  NASA APOD
                </span>
                {heroData?.copyright && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    © {heroData.copyright}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {heroData?.url ? (
                  <HeroModalTrigger heroData={heroData} />
                ) : (
                  <a
                    href="https://apod.nasa.gov/apod/astropix.html"
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
    </section>
  );
}
