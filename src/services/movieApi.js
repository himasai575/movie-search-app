const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return data;
}

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();

  return data;
}

export async function getCategoryMovies(category, page = 1) {
  let url = "";

  if (category === "Telugu") {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=te&page=${page}&sort_by=popularity.desc`;
  } else if (category === "Bollywood") {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&page=${page}&sort_by=popularity.desc`;
  } else if (category === "Hollywood") {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&page=${page}&sort_by=popularity.desc`;
  } else if (category === "Thriller") {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53&page=${page}&sort_by=popularity.desc`;
  } else if (category === "Action") {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page}&sort_by=popularity.desc`;
  } else if (category === "Comedy") {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page}&sort_by=popularity.desc`;
  } else if (category === "Horror") {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page}&sort_by=popularity.desc`;
  } else {
    return getPopularMovies(page);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch category movies");
  }

  const data = await response.json();

  return data;
}