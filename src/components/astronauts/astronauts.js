import { fetchAstronauts } from "@/services/fetch-datasets";
import AstroCard from "./astro-card";

export default async function Astronauts() {
  const astronautData = await fetchAstronauts();

  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Astronauts in Space Right Now: {astronautData.length}</h2>
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
            gap: "1rem",
          }}
        >
          {astronautData.map((astro) => (
            <AstroCard key={astro.id ?? astro.name} astro={astro} />
          ))}
        </div>
    </section>
  );
}