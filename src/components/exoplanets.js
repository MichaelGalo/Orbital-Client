import { fetchExoplanetsData } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";


export const Exoplanets = () => {
    const [exoplanets_data, setExoplanetsData] = useState([]);

  useEffect(() => {
    const getExoplanets = async () => {
      const offsets = Array.from({ length: 5 }, (_, i) => i * 1000);
      try {
        const pages = await Promise.all(
          offsets.map((offset) => fetchExoplanetsData(offset, 1000))
        );
        const combined = pages.flat();
        setExoplanetsData(combined);
      } catch (err) {
        console.error("Failed to fetch exoplanets:", err);
      }
    };
    getExoplanets();
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
