function CategoryButtons({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Telugu",
    "Bollywood",
    "Hollywood",
    "Thriller",
    "Action",
    "Comedy",
    "Horror",
  ];

  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category ? "category active" : "category"
          }
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;