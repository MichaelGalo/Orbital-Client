"use client"
import { fetchHeroImage } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const getHeroImage = async () => {
      const response = await fetchHeroImage();
      setHeroData(response[0]);
    };

    getHeroImage();
  }, []);

  const imageUrl = heroData?.url;
  const title = heroData?.title;
  const explanation = heroData?.explanation;
  const date = heroData?.date;
  const copyright = heroData?.copyright;

  const formattedDate = date ? new Date(date).toLocaleDateString() : null;

  return (
    <section className="rounded-lg overflow-hidden shadow-lg flex flex-col">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title || "NASA Picture of the Day"}
          className="w-full h-64 sm:h-96 object-cover"
        />
      )}

      <div className="p-6 bg-white/90 dark:bg-black/60 flex flex-col items-center text-center gap-2">
        {title ? (
          <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
        ) : (
          <h2 className="text-2xl font-semibold leading-tight">NASA Picture</h2>
        )}

        {formattedDate && (
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
        )}

        {explanation ? (
         <>
          <p className="text-lg max-w-prose mt-2">{explanation}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{copyright}</p>
        </>
        ) : (
          <p className="text-lg mt-2">Simplifying the astronomical.</p>
        )}
      </div>
    </section>
  );
};
