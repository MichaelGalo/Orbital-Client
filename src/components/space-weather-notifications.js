import { fetchSpaceWeatherAlerts } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const SpaceWeatherNotifications = () => {
  const [space_weather_alerts, setSpaceWeatherAlerts] = useState([]);

  useEffect(() => {
    const getSpaceWeatherAlerts = async () => {
      const data = await fetchSpaceWeatherAlerts();
      data.map((alert) => {
        if (alert.message_type === "CME") {
          alert.message_type = "Coronal Mass Ejection";
        } else if (alert.message_type === "CMEAnalysis") {
          alert.message_type = "Coronal Mass Ejection Analysis";
        } else if (alert.message_type === "GST") {
          alert.message_type = "Geomagnetic Storm";
        } else if (alert.message_type === "IPS") {
          alert.message_type = "Interplanetary Shock";
        } else if (alert.message_type === "FLR") {
          alert.message_type = "Solar Flare";
        } else if (alert.message_type === "SPE") {
          alert.message_type = "Solar Particle Event";
        } else if (alert.message_type === "MPC") {
          alert.message_type = "Magnetopause Crossing";
        } else if (alert.message_type === "RBE") {
          alert.message_type = "Radiation Belt Enhancement";
        } else if (alert.message_type === "HSS") {
          alert.message_type = "Hight Speed Stream";
        } else if (alert.message_type === "Notifications") {
          alert.message_type = "Notifications";
        }
      });

      setSpaceWeatherAlerts(data);
    };
    getSpaceWeatherAlerts();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        Space Weather Notifications
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {space_weather_alerts.map((alert) => (
          <div
            key={alert.message_id}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{alert.message_type}</h3>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {alert.message_issue_time}
                </div>

                {/* Render markdown here */}
                <div className="prose dark:prose-invert max-w-none mt-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {alert.messageBody}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
