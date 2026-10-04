function MovieDetails({ movie, onBack }) {
  if (!movie) {
    return null;
  }

  return (
    <div className="movie-details">
      <button className="back-button" onClick={onBack}>
        ← Back to Movies
      </button>

      <div className="details-container">
        <div className="details-poster">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="no-poster">
              No Image Available
            </div>
          )}
        </div>

        <div className="details-content">
          <h1>{movie.title}</h1>

          <div className="details-info">
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>

            <span>
              📅{" "}
              {movie.release_date
                ? movie.release_date
                : "Unknown"}
            </span>
          </div>

          <h3>Overview</h3>

          <p>
            {movie.overview
              ? movie.overview
              : "No overview available for this movie."}
          </p>

          <div className="details-extra">
            <p>
              <strong>Language:</strong>{" "}
              {movie.original_language?.toUpperCase()}
            </p>

            <p>
              <strong>Popularity:</strong>{" "}
              {movie.popularity?.toFixed(0)}
            </p>

            <p>
              <strong>Vote Count:</strong>{" "}
              {movie.vote_count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;