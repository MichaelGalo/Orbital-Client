import ExoplanetHistogram from "./exoplanet-histogram";

const ExoplanetsCharts = ({allExoplanets}) => {
  const discoveryYears = allExoplanets.map((planet) => Number(planet.discovery_year));
  const radii = allExoplanets.map((planet) => Number(planet.radius_earth_radii));
  const radiiBins = [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 75, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const radiiLabels = radiiBins.slice(1).map((upper, i) => {
    const lower = radiiBins[i];
    return lower === 0 ? `<=${upper}` : `${lower}-${upper}`;
  });
  const discoveryMethodLabels = [...new Set(allExoplanets.map((planet) => planet.discovery_method))];
  const discoveryMethods = allExoplanets.map((planet) => planet.discovery_method);
  const distance = allExoplanets.map((planet) => Number(planet.system_distance));
  const distanceLabels = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100", ">100"];


  return (
    <section aria-labelledby="exoplanets-charts-title" className="space-y-6">
        <div className="max-w-7xl mx-auto">
          <ExoplanetHistogram
            data={discoveryYears}
            height={500}
            bins={Math.min(new Set(allExoplanets.map((planet) => planet.discovery_year)).size)}
            title="Exoplanet Discoveries by Year"
            tickFormatSpec="d"
          />
        </div>

        <div className="max-w-7xl mx-auto">
            <ExoplanetHistogram
            data={distance}
            height={500}
            bins={Math.max(distance.length, 1)}
            title="Distance to Host Star (in parsecs)"
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