import ExoplanetHistogram from "./exoplanet-histogram";

const ExoplanetsCharts = ({allExoplanets}) => {
  const discoveryYears = allExoplanets
    .map((planet) => {
      const discoveryYearNumber = Number(planet.discovery_year);
      return Number.isFinite(discoveryYearNumber) ? discoveryYearNumber : NaN;
    })
    .filter((value) => !Number.isNaN(value));

  const radii = allExoplanets.map((planet) => Number(planet.radius_earth_radii)).filter(Number.isFinite);

  return (
    <section aria-labelledby="exoplanets-charts-title" className="space-y-6">
        <div className="max-w-7xl mx-auto">
          <ExoplanetHistogram
            data={discoveryYears}
            height={500}
            bins={Math.min(new Set(allExoplanets.map((planet) => planet.discovery_year).filter(Boolean)).size || 10, 80)}
            title="Exoplanet Discoveries by Year"
            tickFormatSpec="d"
          />
        </div>

        <div className="w-full">
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