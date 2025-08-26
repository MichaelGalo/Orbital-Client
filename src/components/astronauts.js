import { fetchAstronauts } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";

export const Astronauts = () => {
    const [astronautData, setAstronautData] = useState([]);

    useEffect(() => {
        const getAstronauts = async () => {
            const data = await fetchAstronauts();
            console.log(data);
            setAstronautData(data);
        };
        getAstronauts();
    }, []);



    return (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Current Astronauts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {astronautData.map((astro) => (
              <article
                key={astro.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center"
              >
                <img
                  src={astro.image_url}
                  alt={`${astro.name} headshot`}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h3 className="font-medium">{astro.name} | {astro.age}</h3>
                <h4 className="text-sm text-gray-500 dark:text-gray-400">{astro.agency_abbrev} - {astro.agency}</h4>
                <div className="mt-2 text-sm">
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Bio: {astro.bio}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Time in Space: {astro.time_in_space}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">EVA Time: {astro.eva_time}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Spacewalk Count: {astro.spacewalks_count}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Learn more: <a href={astro.wiki} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{astro.wiki}</a></p>
                </div>
              </article>
            ))}
          </div>
        </section>
    )
}