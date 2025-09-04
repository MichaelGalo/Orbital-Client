import ExoplanetHistogram from "./exoplanet-histogram";

const ExoplanetsCharts = ({allExoplanets}) => {
  const discoveryYears = allExoplanets.map((planet) => Number(planet.discovery_year));
  const radii = allExoplanets.map((planet) => Number(planet.radius_earth_radii));

  const discoveryMethodLabels = [...new Set(allExoplanets.map((planet) => planet.discovery_method))];
  const discoveryMethods = allExoplanets.map((planet) => planet.discovery_method);


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
            bins={100}
            title={"Exoplanet Radius (Compared to Earth)"}
          />
        </div>
    </section>
  );
};

export default ExoplanetsCharts;