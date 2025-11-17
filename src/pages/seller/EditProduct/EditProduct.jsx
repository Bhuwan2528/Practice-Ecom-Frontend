import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css"; // same styling

const EditProduct = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    tags: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Fetch existing product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://practice-ecom-backend.onrender.com/api/products/${id}`, {
          withCredentials: true,
        });
        const product = res.data;
        setFormData({
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          tags: product.tags?.join(", ") || "",
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        setMessage("Failed to load product data.");
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.put(
        `https://practice-ecom-backend.onrender.com/api/products/${id}`,
        {
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()),
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMessage("✅ Product updated successfully!");
        setTimeout(() => navigate("/dashboard/manage-products"), 1500);
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update product.");
    }
  };

  return (
    <div className="add-container">
      <div className="add-box">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
          />
          <button type="submit">Update Product</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default EditProduct;
