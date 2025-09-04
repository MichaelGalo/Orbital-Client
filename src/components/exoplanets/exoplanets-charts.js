import ExoplanetHistogram from "./exoplanet-histogram";

const ExoplanetsCharts = ({allExoplanets}) => {
    return (
        <section aria-labelledby="exoplanets-charts-title" className="space-y-6">
          <div className="mb-6">
              <ExoplanetHistogram
                data={allExoplanets
                  .map((planet) => {
                    const y = Number(planet.discovery_year);
                    return Number.isFinite(y) ? y : NaN;
                  })
                  .filter((value) => !Number.isNaN(value))}
                width={900}
                height={300}
                bins={Math.min(new Set(allExoplanets.map((planet) => planet.discovery_year).filter(Boolean)).size || 10, 80)}
                title="Exoplanet Discoveries by Year"
              />
          </div>

          <div className="mb-6">
              <ExoplanetHistogram
                data={allExoplanets.map(planet => Number(planet.radius_earth_radii)).filter(Number.isFinite)}
                width={900}
                height={300}
                bins={100}
                title={"Exoplanet Radius (Compared to Earth)"}
              />
          </div>
        </section>
    )
};

export default ExoplanetsCharts;