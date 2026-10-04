function MovieCard({
  movie,
  onMovieClick,
  favorites,
  onToggleFavorite,
}) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onToggleFavorite(movie);
  };

  return (
    <div
      className="movie-card"
      onClick={() => onMovieClick(movie)}
    >
      <div className="poster-container">
        <img src={imageUrl} alt={movie.title} />

        <button
          className={`favorite-button ${
            isFavorite ? "favorite-active" : ""
          }`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="movie-info">
        <h2>{movie.title}</h2>

        <p>
          ⭐ Rating: {movie.vote_average?.toFixed(1) || "N/A"}
        </p>

        <p>
          📅 Release Date: {movie.release_date || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;