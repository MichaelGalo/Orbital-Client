const baseUrl = process.env.NEXT_PUBLIC_DEPLOYMENT_URL;

const fetcher = async (url) => {
  const response = await fetch(url, {
    cache: 'no-store', 
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok for ${url}`);
  }

  return response.json();
};

export const fetchHeroImage = () => fetcher(`${baseUrl}/datasets/2`);
export const fetchAstronauts = () => fetcher(`${baseUrl}/datasets/1`);
export const fetchSpaceWeatherAlerts = () => fetcher(`${baseUrl}/datasets/3`);
export const fetchExoplanetsData = (offset, limit) =>
  fetcher(`${baseUrl}/datasets/4?offset=${offset}&limit=${limit}`);

export const fetchBatchedExoplanets = async (batchSize) => {
  const allResults = [];
  for (let offset = 0; ; offset += batchSize) {
    const batch = await fetchExoplanetsData(offset, batchSize);
    if (batch.length === 0) break;
    allResults.push(...batch);
    if (batch.length < batchSize) break;
  }
  return allResults;
};
