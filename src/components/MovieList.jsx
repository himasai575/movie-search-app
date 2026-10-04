import MovieCard from "./MovieCard";

function MovieList({
  movies,
  onMovieClick,
  favorites,
  onToggleFavorite,
}) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieList;