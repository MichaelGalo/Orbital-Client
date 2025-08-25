import { fetchHeroImage } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";


export const Hero = () => {
    const [hero_image, setHeroImage] = useState();
    useEffect(() => {
        const getHeroImage = async () => {
            const image = await fetchHeroImage();
            setHeroImage(image);
        };
        getHeroImage();
        console.log(hero_image);
    }, []);
    
    return (
        <section className="relative rounded-lg overflow-hidden shadow-lg">
          <img
            src={hero_image}
            alt="Hero background"
            className="absolute inset-0 w-full h-64 sm:h-96 object-cover opacity-80 dark:opacity-60"
          />
          <div className="relative z-10 p-8 sm:p-16 flex flex-col items-start gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Welcome to Orbital Client</h1>
            <p className="text-lg">Simplifying the astronomical.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 dark:to-black/40 pointer-events-none" />
        </section>
    )
}