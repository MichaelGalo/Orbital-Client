import { fetchSpaceWeatherAlerts } from "@/services/fetch-datasets";
import { useEffect, useState } from "react";
import SpaceWeatherModal from "./space-weather-modal";

export const SpaceWeatherNotifications = () => {
  const [space_weather_alerts, setSpaceWeatherAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getSpaceWeatherAlerts = async () => {
      const data = await fetchSpaceWeatherAlerts();

      const TYPE_LABELS = {
        CME: "Coronal Mass Ejection",
        CMEAnalysis: "Coronal Mass Ejection Analysis",
        GST: "Geomagnetic Storm",
        IPS: "Interplanetary Shock",
        FLR: "Solar Flare",
        SPE: "Solar Particle Event",
        MPC: "Magnetopause Crossing",
        RBE: "Radiation Belt Enhancement",
        HSS: "High Speed Stream",
        Notifications: "Notifications",
      };

      const expanded_labels = data.map((alert) => ({
        ...alert,
        message_type: TYPE_LABELS[alert.message_type] ?? alert.message_type,
      }));

      setSpaceWeatherAlerts(expanded_labels);
      setCurrentPage(1);
    };
    getSpaceWeatherAlerts();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        Space Weather Notifications
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(() => {
          // sort newest-first and slice for pagination
          const sorted = [...space_weather_alerts].sort((a, b) =>
            new Date(b.message_issue_time) - new Date(a.message_issue_time)
          );
          const startIdx = (currentPage - 1) * itemsPerPage;
          const pageAlerts = sorted.slice(startIdx, startIdx + itemsPerPage);
          return pageAlerts.map((alert) => (
          <div
            key={alert.message_id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedAlert(alert)}
            onKeyDown={(e) => e.key === "Enter" && setSelectedAlert(alert)}
            className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow cursor-pointer hover:shadow-md focus:shadow-md outline-none"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm truncate">{alert.message_type}</h3>
              <div className="text-xs text-gray-600 dark:text-gray-300 ml-2">
                {alert.message_issue_time}
              </div>
            </div>
          </div>
          ));
        })()}
      </div>

      {/* Pagination controls */}
      {space_weather_alerts.length > itemsPerPage && (
        <div className="mt-4 flex items-center justify-center space-x-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm disabled:opacity-50"
            aria-label="Previous page"
          >
            Prev
          </button>

          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {Math.max(1, Math.ceil(space_weather_alerts.length / itemsPerPage))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(Math.ceil(space_weather_alerts.length / itemsPerPage), p + 1))
            }
            disabled={currentPage >= Math.ceil(space_weather_alerts.length / itemsPerPage)}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm disabled:opacity-50"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}

  <SpaceWeatherModal selectedAlert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </section>
  );
};
