import { useEffect, useState } from "react";

export const Astronauts = () => {
    const [astronauts, setAstronauts] = useState([]);

    useEffect(() => {
        const getAstronauts = async () => {
            const data = await fetchAstronauts();
            setAstronauts(data);
        };
        getAstronauts();
    }, []);

    return (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Current Astronauts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {astronauts.map((a) => (
              <article
                key={a.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center"
              >
                <img
                  src={a.headshot}
                  alt={`${a.name} headshot`}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h3 className="font-medium">{a.name}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{a.bio}</p>
              </article>
            ))}
          </div>
        </section>
    )
}