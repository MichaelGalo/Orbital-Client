const ExoplanetGlanceInsights = ({ exoplanets }) => {
  if (!exoplanets || exoplanets.length === 0) {
    return <div className="p-3">No exoplanets data available</div>;
  }

  const totalExoplanets = exoplanets.length;
  const distances = exoplanets.map((planet) => Number(planet.system_distance) || 0);
  const averageDistance = distances.reduce((sum, distance) => sum + distance, 0) / totalExoplanets;
  const maxDistance = Math.max(...distances);
  const hostIdentifiers = exoplanets.map((planet) => (planet && planet.host_star ? String(planet.host_star) : 'unknown'));
  const uniqueHosts = new Set(hostIdentifiers.filter((id) => id && id !== 'unknown'));
  const numberOfHostStars = uniqueHosts.size;

  return (
    <section aria-label="Exoplanet glance insights">
      <h2 className="mb-3 text-lg font-semibold">Exoplanet Glance Insights</h2>
      <div className="flex flex-wrap gap-3 items-stretch">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-[#e6eef8] rounded-md p-4 min-w-[180px] shadow-xl flex-1">
          <div className="text-sm text-slate-400">Total Exoplanets</div>
          <div className="text-xl font-bold mt-1">{totalExoplanets}</div>
        </div>

        <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-[#e6eef8] rounded-md p-4 min-w-[180px] shadow-xl flex-1">
          <div className="text-sm text-slate-400">Average Distance to Host Star</div>
          <div className="text-xl font-bold mt-1">{Number.isFinite(averageDistance) ? averageDistance.toFixed(2) : '—'} parsecs</div>
        </div>

        <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-[#e6eef8] rounded-md p-4 min-w-[180px] shadow-xl flex-1">
          <div className="text-sm text-slate-400">Number of Host Stars</div>
          <div className="text-xl font-bold mt-1">{numberOfHostStars}</div>
        </div>

        <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-[#e6eef8] rounded-md p-4 min-w-[180px] shadow-xl flex-1">
          <div className="text-sm text-slate-400">Farthest System Distance</div>
          <div className="text-xl font-bold mt-1">{Number.isFinite(maxDistance) ? maxDistance.toFixed(2) : '—'} parsecs</div>
        </div>
      </div>
    </section>
  );
};

export default ExoplanetGlanceInsights;