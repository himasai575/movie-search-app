import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import CategoryButtons from "./components/CategoryButtons";

import {
  searchMovies,
  getPopularMovies,
  getCategoryMovies,
} from "./services/movieApi";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Load popular movies when app starts
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async (pageNumber = 1) => {
    setLoading(true);
    setError("");

    try {
      const data = await getPopularMovies(pageNumber);

      setMovies(data.results || []);
      setPage(pageNumber);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load movies. Please check your internet connection."
      );

      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category, pageNumber = 1) => {
    setSelectedCategory(category);
    setQuery("");
    setSelectedMovie(null);
    setShowFavorites(false);

    setLoading(true);
    setError("");

    try {
      const data = await getCategoryMovies(category, pageNumber);

      setMovies(data.results || []);
      setPage(pageNumber);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    } catch (error) {
      console.error(error);

      setError("Unable to load movies. Please try again.");

      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (pageNumber = 1) => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError("");
    setShowFavorites(false);

    try {
      const data = await searchMovies(query, pageNumber);

      setMovies(data.results || []);
      setPage(pageNumber);
      setTotalPages(Math.min(data.total_pages || 1, 500));

      setSelectedCategory("");
      setSelectedMovie(null);
    } catch (error) {
      console.error(error);

      setError("Unable to search movies. Please try again.");

      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Add or remove movie from favorites
  const toggleFavorite = (movie) => {
    const alreadyFavorite = favorites.some(
      (favorite) => favorite.id === movie.id
    );

    if (alreadyFavorite) {
      setFavorites(
        favorites.filter((favorite) => favorite.id !== movie.id)
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // Show favorites
  const handleShowFavorites = () => {
    setShowFavorites(true);
    setSelectedMovie(null);
  };

  // Show movies
  const handleShowMovies = () => {
    setShowFavorites(false);
  };

  // Pagination
  const handlePageChange = (newPage) => {
    if (query.trim()) {
      handleSearch(newPage);
    } else if (selectedCategory) {
      handleCategoryChange(selectedCategory, newPage);
    } else {
      loadPopularMovies(newPage);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Rating filter + sorting
  const filteredMovies = movies
    .filter((movie) => {
      if (!rating) {
        return true;
      }

      return movie.vote_average >= Number(rating);
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.vote_average - a.vote_average;
      }

      if (sortBy === "releaseDate") {
        return new Date(b.release_date) - new Date(a.release_date);
      }

      return 0;
    });

  // Movie details page
  if (selectedMovie) {
    return (
      <div className="app">
        <MovieDetails
          movie={selectedMovie}
          onBack={() => setSelectedMovie(null)}
        />
      </div>
    );
  }

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h1>🎬 Movie Search App</h1>

        <p>Discover movies, ratings and release dates</p>

        <div className="favorite-buttons">

          <button
            className={!showFavorites ? "active-button" : ""}
            onClick={handleShowMovies}
          >
            🎬 Movies
          </button>

          <button
            className={showFavorites ? "active-button" : ""}
            onClick={handleShowFavorites}
          >
            ❤️ Favorites ({favorites.length})
          </button>

        </div>
      </header>


      {/* SEARCH + FILTERS */}
      {!showFavorites && (
        <>
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={() => handleSearch(1)}
          />

          <CategoryButtons
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />

          <Filters
            rating={rating}
            setRating={setRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </>
      )}


      {/* FAVORITES PAGE */}
      {showFavorites ? (
        <div className="favorites-section">

          <h2>❤️ My Favorite Movies</h2>

          {favorites.length === 0 ? (

            <div className="empty-favorites">
              <p>💔 You don't have any favorite movies yet.</p>

              <p>
                Go back to Movies and add some!
              </p>
            </div>

          ) : (

            <MovieList
              movies={favorites}
              onMovieClick={setSelectedMovie}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />

          )}

        </div>
      ) : (

        <>
          {/* LOADING */}
          {loading && (
            <div className="status-message">

              <div className="loader"></div>

              <p>Loading movies...</p>

            </div>
          )}


          {/* ERROR */}
          {!loading && error && (
            <div className="status-message error-message">
              ⚠️ {error}
            </div>
          )}


          {/* MOVIES FOUND */}
          {!loading &&
            !error &&
            filteredMovies.length > 0 && (
              <MovieList
                movies={filteredMovies}
                onMovieClick={setSelectedMovie}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )}


          {/* NO MOVIES FOUND */}
          {!loading &&
            !error &&
            filteredMovies.length === 0 && (
              <div className="empty-message">

                <div className="empty-icon">
                  🔍
                </div>

                <h2>No movies found</h2>

                <p>
                  We couldn't find any movies matching:
                </p>

                <strong>
                  "{query}"
                </strong>

                <p>
                  Try searching with a different movie name.
                </p>

              </div>
            )}


          {/* PAGINATION */}
          {!loading &&
            !error &&
            filteredMovies.length > 0 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

        </>
      )}

    </div>
  );
}

export default App;