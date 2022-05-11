const BASE_URL = "https://v3.football.api-sports.io";

const fetchCountries = async () => {
  const response = await fetch(`${BASE_URL}/countries`, {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.REACT_APP_FOOTBALL_API_KEY
    }
  });
  return response.json();
}

const fetchCompetitions = async (country) => {
  const response = await fetch(`${BASE_URL}/leagues?country=${country}&current=true`, {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.REACT_APP_FOOTBALL_API_KEY
    }
  });
  return response.json();
}

const fetchCompetition = async (competitionId) => {
  const response = await fetch(`${BASE_URL}/leagues?id=${competitionId}`, {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.REACT_APP_FOOTBALL_API_KEY
    }
  });
  return response.json();
}

const fetchStandings = async (competitionId, season) => {
  const response = await fetch(`${BASE_URL}/standings?league=${competitionId}&season=${season}`, {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.REACT_APP_FOOTBALL_API_KEY
    }
  });
  return response.json();
}

const fetchFixtures = async (competitionId, season, limit) => {
  const response = await fetch(`${BASE_URL}/fixtures?league=${competitionId}&season=${season}&next=${limit}`, {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.REACT_APP_FOOTBALL_API_KEY
    }
  });
  return response.json();
}

const fetchRankings = async (ranking, season, competitionId) => {
  const response = await fetch(`${BASE_URL}/players/${ranking}?season=${season}&league=${competitionId}`, {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.REACT_APP_FOOTBALL_API_KEY
    }
  });
  return response.json();
}

export {
  fetchCountries,
  fetchCompetitions,
  fetchCompetition,
  fetchStandings,
  fetchFixtures,
  fetchRankings
}