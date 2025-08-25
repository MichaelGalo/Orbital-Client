import { fetchExoplanetsData } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";


export const Exoplanets = () => {
    const [exoplanets_data, setExoplanetsData] = useState([]);

    useEffect(() => {
        const fetchExoplanets = async () => {
            const data = await fetchExoplanetsData();
            setExoplanetsData(data);
        };
        fetchExoplanets();
    }, []);

    return (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Exoplanet Data</h2>
          <div className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            {exoplanets_data.map((p) => (
              <div key={p.id}>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
    )
}
