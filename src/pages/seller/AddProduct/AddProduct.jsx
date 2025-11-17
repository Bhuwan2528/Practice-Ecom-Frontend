import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    tags: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://practice-ecom-backend.onrender.com/api/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ send cookie automatically
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Product added successfully!");
      setForm({ name: "", price: "", description: "", image: "", tags: "" });
    } else {
      setMessage(data.message || "❌ Failed to add product");
    }
  } catch (err) {
    setMessage("❌ Something went wrong!");
  }
};


  return (
    <div className="add-container">
      <div className="add-box">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
          <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
          <textarea name="description" placeholder="Product Description" value={form.description} onChange={handleChange} required />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
          <input name="tags" placeholder="Tags (comma-separated)" value={form.tags} onChange={handleChange} />
          <button type="submit">Add Product</button>
        </form>
        {message && <p className="status-msg">{message}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
