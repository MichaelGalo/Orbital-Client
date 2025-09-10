import { range } from "d3";
import ExoplanetHistogram from "./exoplanet-histogram";

const ExoplanetsCharts = ({allExoplanets}) => {
  const discoveryYears = allExoplanets.map((planet) => Number(planet.discovery_year));
  const yearBins = Math.min(new Set(allExoplanets.map((planet) => planet.discovery_year)).size)
  const radii = allExoplanets.map((planet) => Number(planet.radius_earth_radii));
  const radiiBins = [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 75, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const radiiLabels = radiiBins.slice(1).map((upper, i) => {
    const lower = radiiBins[i];
    return lower === 0 ? `<=${upper}` : `${lower}-${upper}`;
  });
  const discoveryMethodLabels = [...new Set(allExoplanets.map((planet) => planet.discovery_method))];
  const discoveryMethods = allExoplanets.map((planet) => planet.discovery_method);
  const distance = allExoplanets.map((planet) => Number(planet.system_distance));
  const distanceLabels = ["0-10 parsecs", "10-20 parsecs", "20-30 parsecs", "30-40 parsecs", "40-50 parsecs", "50-60 parsecs", "60-70 parsecs", "70-80 parsecs", "80-90 parsecs", "90-100 parsecs", ">100 parsecs"];


  return (
    <section aria-labelledby="exoplanets-charts-title" className="space-y-6">
        <div className="max-w-7xl mx-auto">
          <ExoplanetHistogram
            data={discoveryYears}
            height={500}
            bins={yearBins}
            title="Exoplanet Discoveries by Year"
            tickFormatSpec="d"
          />
        </div>

        <div className="max-w-7xl mx-auto">
            <ExoplanetHistogram
            data={distance}
            height={500}
            bins={Math.max(distance.length, 1)}
            title="Distance to Host Star"
            labels={distanceLabels}
            />
        </div>

        <div className="max-w-7xl mx-auto">
            <ExoplanetHistogram
            data={discoveryMethods}
            height={500}
            bins={Math.max(discoveryMethodLabels.length, 1)}
            title="Discovery Method"
            labels={discoveryMethodLabels}
            />
        </div>

        <div className="max-w-7xl mx-auto">
          <ExoplanetHistogram
            data={radii}
            height={500}
            bins={radiiBins}
            title={"Exoplanet Radius (Compared to Earth)"}
            labels={radiiLabels}
          />
        </div>
    </section>
  );
};

export default ExoplanetsCharts;