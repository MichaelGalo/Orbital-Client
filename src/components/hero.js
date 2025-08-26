"use client"
import { fetchHeroImage } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const getHeroImage = async () => {
      const response = await fetchHeroImage();
      console.log("fetchHeroImage returned:", response);
      setHeroData(response[0]);
    };

    getHeroImage();
  }, []);

  const imageUrl = heroData?.url;
  const title = heroData?.title;
  const explanation = heroData?.explanation;
  const date = heroData?.date;

  return (
    <section className="rounded-lg overflow-hidden shadow-lg flex flex-col">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title || "NASA Picture of the Day"}
          className="w-full h-64 sm:h-96 object-cover"
        />
      )}
      <div className="p-8 sm:p-16 flex flex-col items-start gap-4 bg-white dark:bg-black">
        <h1 className="text-4xl sm:text-5xl font-bold">{title || "Welcome to Orbital Client"}</h1>
        {explanation ? (
          <p className="text-lg max-w-prose">{explanation}</p>
        ) : (
          <p className="text-lg">Simplifying the astronomical.</p>
        )}
        <div className="text-sm text-muted-foreground">
          {date && <span>{date}</span>}
        </div>
      </div>
    </section>
  );
};
