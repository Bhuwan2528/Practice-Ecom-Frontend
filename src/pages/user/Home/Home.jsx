import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../Components/SearchBar/SearchBar"; 
import "./Home.css";
import { Link } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/products?search=${query}`);
  };

  return (
    <header className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Discover Timeless Fashion</h1>
        <p className="hero-sub">
          Curated collections. Sustainable choices. Designed for you.
        </p>

        {/* ⭐ REUSABLE SEARCH BAR COMPONENT */}
        <SearchBar
          placeholder="Search for dresses, jackets, sneakers..."
          onSearch={handleSearch}
        />

        <div className="hero-cta">
          <Link to="/products" className="cta-link">Explore Our Products</Link>
        </div>

      </div>
    </header>
  );
};

export default Home;
