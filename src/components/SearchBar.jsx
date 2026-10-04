function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />

      <button onClick={onSearch}>
        🔍 Search
      </button>
    </div>
  );
}

export default SearchBar;