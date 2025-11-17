import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch seller products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/seller", {
        withCredentials: true,
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        withCredentials: true,
      });
      setProducts(products.filter((p) => p._id !== productId));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product.");
    }
  };

  if (loading) return <p className="loading-text">Loading products...</p>;

  return (
    <div className="manage-products-container">
      <h2 className="manage-title">🧾 Manage Your Products</h2>

      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.title}
                />
              </div>

              <div className="product-details">
                <h3>{product.title}</h3>
                <p className="product-price">₹{product.price}</p>
              </div>

              <div className="product-actions">
                <button
                  className="btn edit-btn"
                  onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
