const URL = 'https://swapi.dev/api/planets';

const fetchPlanetsAPI = async () => {
  const { results } = await fetch(URL).then((response) => response.json());
  return results
    .filter((planet) => delete planet.residents)
    .sort((a, b) => a.name.localeCompare(b.name));
};

export default fetchPlanetsAPI;
