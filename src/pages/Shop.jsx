import { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Shop.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("name-asc");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToCart } = useCart();
  const sidebarRef = useRef();

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Men's Shirts", value: "mens-shirts" },
    { label: "Women's Dresses", value: "womens-dresses" },
    { label: "Women's Shoes", value: "womens-shoes" },
    { label: "Fragrances", value: "fragrances" },
    { label: "Skin Care", value: "skincare" },
  ];

  const sortOptions = [
    { label: "Name (A-Z)", value: "name-asc" },
    { label: "Name (Z-A)", value: "name-desc" },
    { label: "Price (Low to High)", value: "price-asc" },
    { label: "Price (High to Low)", value: "price-desc" },
    { label: "Rating (Low to High)", value: "rating-asc" },
    { label: "Rating (High to Low)", value: "rating-desc" },
  ];

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

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

    if (category !== "all") {
      temp = temp.filter((p) => p.category === category);
    }

    temp = temp.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

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

  // Close sidebar if clicking outside on small screens
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="shop-page">
      {/* Carousel Section */}
      <div className="shop-carousel">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img
              src="https://source.unsplash.com/1200x400/?shopping,fashion"
              alt="Shop Slide 1"
              className="carousel-img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://source.unsplash.com/1200x400/?clothes,style"
              alt="Shop Slide 2"
              className="carousel-img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://source.unsplash.com/1200x400/?shoes,sneakers"
              alt="Shop Slide 3"
              className="carousel-img"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
        aria-label="Shop Filters Sidebar"
      >
        <button
          className="sidebar-hamburger"
          aria-expanded={sidebarOpen}
          aria-controls="sidebar-filters"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Close filters menu" : "Open filters menu"}
        >
          <div className={`bar ${sidebarOpen ? "open" : ""}`}></div>
          <div className={`bar ${sidebarOpen ? "open" : ""}`}></div>
          <div className={`bar ${sidebarOpen ? "open" : ""}`}></div>
        </button>

        <div
          id="sidebar-filters"
          className="filters-content"
          aria-hidden={!sidebarOpen && window.innerWidth < 1024}
        >
          <h2>Categories</h2>
          <div className="button-group categories-group">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`btn-filter ${category === cat.value ? "active" : ""}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <h2>Price Range</h2>
          <label className="price-label">
            ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="price-range-inputs">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
          </div>

          <h2>Sort Options</h2>
          <div className="button-group">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                className={`btn-filter ${sortBy === opt.value ? "active" : ""}`}
                onClick={() => setSortBy(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="product-grid" tabIndex={-1}>
        {loading ? (
          <p>Loading products...</p>
        ) : filtered.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filtered.map((product) => (
            <div key={product.id} data-aos="fade-up" className="product-card-container">
              <div className="product-card">
                <button className="wishlist-button" aria-label="Add to Wishlist">
                  ❤️
                </button>
                <ProductCard product={product} />
              </div>
            </div>
          ))
        )}
      </main>

      {/* Overlay for small screen sidebar open */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />}
    </div>
  );
}
