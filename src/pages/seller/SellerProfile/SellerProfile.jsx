import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://practice-ecom-backend.onrender.com/api/user/profile", {
          withCredentials: true,
        });
        setFormData(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://practice-ecom-backend.onrender.com/api/user/profile",
        formData,
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error("Profile update error:", err);
      setMessage("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="add-container">
      <div className="add-box">
        <h2>👤 Seller Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Change Password (optional)"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Update Profile</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SellerProfile;
