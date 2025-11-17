import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";   // ⭐ ADD THIS
import "./Products.css";
import SearchBar from "../../../Components/SearchBar/SearchBar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();         // ⭐ TRACK URL CHANGES

  useEffect(() => {
    const params = new URLSearchParams(location.search); 
    const searchTerm = params.get("search");
    setQuery(searchTerm || "");

    if (searchTerm) {
      // ⭐ SEARCH API
      fetch(`https://practice-ecom-backend.onrender.com/api/products/search?q=${searchTerm}`,
      {withCredentials: true})
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    } else {
      // ⭐ NORMAL PRODUCTS
      fetch("https://practice-ecom-backend.onrender.com/api/products", { withCredentials: true })
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, [location.search]);   // ⭐ CORRECT DEPENDENCY

  const handleBuy = async (id) => {
    try {
      const res = await fetch(`https://practice-ecom-backend.onrender.com/api/products/buy/${id}`, {
        method: "POST",
        credentials: "include",
        withCredentials: true
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Purchase failed");
      console.error(error);
    }
  };

  return (
    <div className="shop-products-container">
      
      <div className="products-header">
        <h2 className="products-header-title">
          {query ? `🔍 Search results for: "${query}"` : "🛒 Available Products"}
        </h2>

        <div className="products-header-search">
          <SearchBar />
        </div>
      </div>

      <div className="shop-products-list">
        {products.map((p) => (
          <div key={p._id} className="shop-card">
            {p.image && (
              <img src={p.image} alt={p.title} className="shop-card-img" />
            )}

            <div className="shop-card-info">
              <h3 className="shop-card-title">{p.title}</h3>
              <p className="shop-card-price">₹{p.price}</p>
              <p className="shop-card-seller">
                Sold by: <span>{p.sellerId?.name || "Unknown"}</span>
              </p>
              <button className="shop-buy-btn" onClick={() => handleBuy(p._id)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
