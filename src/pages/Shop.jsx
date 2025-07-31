import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name-asc"); // New sort state
  const { addToCart } = useCart();

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Men's Shirts", value: "mens-shirts" },
    { label: "Women's Dresses", value: "womens-dresses" },
    { label: "Women's Shoes", value: "womens-shoes" },
    { label: "Fragrances", value: "fragrances" },
    { label: "Skin Care", value: "skincare" },
  ];

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFiltered(data.products);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let temp = [...products];

    // Filter by category
    if (category !== "all") {
      temp = temp.filter((p) => p.category === category);
    }

    // Filter by price range
    temp = temp.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort products based on sortBy value
    temp.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-asc":
          return a.rating - b.rating;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFiltered(temp);
  }, [category, priceRange, products, sortBy]);

  return (
    <div style={{ padding: 20 }}>
      <h1>🛍️ Shop</h1>

      <div style={{ marginBottom: 20 }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <label style={{ marginRight: "10px" }}>
          💰 Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>

        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceRange[0]}
          onChange={(e) =>
            setPriceRange([Number(e.target.value), priceRange[1]])
          }
          style={{ marginRight: "10px" }}
        />

        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />

        {/* Sort By Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "8px", marginLeft: "20px" }}
        >
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
          <option value="price-asc">Sort by Price (Low to High)</option>
          <option value="price-desc">Sort by Price (High to Low)</option>
          <option value="rating-asc">Sort by Rating (Low to High)</option>
          <option value="rating-desc">Sort by Rating (High to Low)</option>
        </select>
      </div>

      <div>
        {loading ? (
          <p>Loading products...</p>
        ) : filtered.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: 30,
                borderBottom: "1px solid #ddd",
                paddingBottom: 15,
              }}
            >
              <h3>{item.title}</h3>
              <img src={item.thumbnail} alt={item.title} width="150" />
              <p>${item.price}</p>
              <p>Rating: ⭐ {item.rating.toFixed(1)}</p>
              <div style={{ marginTop: 10 }}>
                <Link to={`/product/${item.id}`} style={{ marginRight: 15 }}>
                  View Details
                </Link>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
