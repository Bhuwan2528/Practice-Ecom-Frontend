import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ placeholder = "Search products..." }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/products?search=${query}`);
  };

  return (
    <form className="searchbar-container" onSubmit={handleSubmit}>
      <input
        className="searchbar-input"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="searchbar-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
