import { fetchBatchedExoplanets } from "@/services/fetch-datasets";
import InspectExoplanets from "./inspect-exoplanets";
import ExoplanetsCharts from "./exoplanets-charts";
import ExoplanetGlanceInsights from "./exoplanet-glance-insights";

export default async function Exoplanets() {
  const allExoplanets = await fetchBatchedExoplanets(1000);

  return (
    <section className="mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold mb-4">Exoplanets</h2>
      <div className="mb-8">
        <ExoplanetGlanceInsights exoplanets={allExoplanets} />
      </div>
      <ExoplanetsCharts allExoplanets={allExoplanets} />
      <InspectExoplanets allExoplanets={allExoplanets} />
    </section>
  );
}
