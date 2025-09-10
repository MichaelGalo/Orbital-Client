const baseUrl = process.env.NEXT_PUBLIC_DEPLOYMENT_URL

export const fetchHeroImage = async () => {
  try {
    const response = await fetch(`${baseUrl}/datasets/2`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hero image data:', error);
    throw error;
  }
};

export const fetchAstronauts = async () => {
  try {
    const response = await fetch(`${baseUrl}/datasets/1`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching astronaut data:', error);
    throw error;
  }
};

export const fetchSpaceWeatherAlerts = async () => {
  try {
    const response = await fetch(`${baseUrl}/datasets/3`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching space weather alerts data:', error);
    throw error;
  }
};

export const fetchExoplanetsData = async (offset, limit) => {
  try {
    const response = await fetch(`${baseUrl}/datasets/4?offset=${offset}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exoplanet data:', error);
    throw error;
  }
};


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
