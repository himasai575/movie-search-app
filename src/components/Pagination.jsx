function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Previous
      </button>

      <span>
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;