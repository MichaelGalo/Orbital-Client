import { fetchSpaceWeatherAlerts } from "@/services/fetch-datasets";
import SpaceWeatherNotificationsModal from "./space-weather-notifications-modal";

export default async function SpaceWeatherNotifications() {
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

  const expandedLabels = data.map((alert) => ({
    ...alert,
    message_type: TYPE_LABELS[alert.message_type] ?? alert.message_type,
  }));

  return <SpaceWeatherNotificationsModal alerts={expandedLabels} />;
}
