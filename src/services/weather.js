const OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const OPEN_METEO_GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const DEFAULT_WEATHER_LOCATION = {
  name: "Toronto, Ontario",
  latitude: 43.6532,
  longitude: -79.3832,
  source: "default"
};

export async function geocodeWeatherLocation(query) {
  const cleanQuery = String(query || "").trim();
  if (!cleanQuery) {
    throw new Error("Digite uma cidade ou regiao em Ontario.");
  }

  const url = new URL(OPEN_METEO_GEOCODE_URL);
  url.searchParams.set("name", cleanQuery);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Nao foi possivel buscar essa localizacao.");
  }

  const payload = await response.json();
  const results = Array.isArray(payload.results) ? payload.results : [];
  const ontarioMatch = results.find((item) => item.admin1 === "Ontario") || results[0];

  if (!ontarioMatch) {
    throw new Error("Localizacao nao encontrada. Tente cidade, Ontario.");
  }

  return {
    name: [ontarioMatch.name, ontarioMatch.admin1, ontarioMatch.country_code].filter(Boolean).join(", "),
    latitude: ontarioMatch.latitude,
    longitude: ontarioMatch.longitude,
    source: "manual"
  };
}

export async function fetchWeatherForecast(location) {
  if (!location?.latitude || !location?.longitude) {
    throw new Error("Localizacao meteorologica invalida.");
  }

  const url = new URL(OPEN_METEO_FORECAST_URL);
  url.searchParams.set("latitude", location.latitude);
  url.searchParams.set("longitude", location.longitude);
  url.searchParams.set("current", "temperature_2m,relative_humidity_2m,precipitation,cloud_cover");
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,sunshine_duration"
  );
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Nao foi possivel carregar a previsao do tempo.");
  }

  const payload = await response.json();
  return normalizeWeatherForecast(payload, location);
}

function normalizeWeatherForecast(payload, location) {
  const current = payload.current || {};
  const daily = payload.daily || {};

  return {
    location,
    fetchedAt: new Date().toISOString(),
    current: {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      precipitation: current.precipitation,
      cloudCover: current.cloud_cover
    },
    daily: (daily.time || []).map((date, index) => ({
      date,
      tempMax: daily.temperature_2m_max?.[index],
      tempMin: daily.temperature_2m_min?.[index],
      precipitationProbability: daily.precipitation_probability_max?.[index],
      precipitationSum: daily.precipitation_sum?.[index],
      sunshineHours: daily.sunshine_duration?.[index] ? Math.round((daily.sunshine_duration[index] / 3600) * 10) / 10 : null
    }))
  };
}
