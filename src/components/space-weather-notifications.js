import { fetchSpaceWeatherAlerts } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";


export const SpaceWeatherNotifications = () => {
    const [space_weather_alerts, setSpaceWeatherAlerts] = useState([]);

    useEffect(() => {
        const getSpaceWeatherAlerts = async () => {
            const data = await fetchSpaceWeatherAlerts();
            setSpaceWeatherAlerts(data);
        };
        getSpaceWeatherAlerts();
    }, []);

    return (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Space Weather Notifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {space_weather_alerts.map((s) => (
              <div key={s.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{s.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.level}</p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{s.time || ""}</div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{s.summary}</p>
              </div>
            ))}
          </div>
        </section>
    )
}