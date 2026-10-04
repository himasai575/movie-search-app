function Filters({ rating, setRating, sortBy, setSortBy }) {
  return (
    <div className="filters">
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">All Ratings</option>
        <option value="8">8+ Rating</option>
        <option value="7">7+ Rating</option>
        <option value="6">6+ Rating</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="rating">Rating: High to Low</option>
        <option value="releaseDate">Release Date: Newest</option>
      </select>
    </div>
  );
}

export default Filters;