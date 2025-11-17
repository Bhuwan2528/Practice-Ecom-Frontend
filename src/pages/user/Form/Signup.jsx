import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../../Context/UserContext";
import './Form.css'

const Signup = () => {
  const { setUser } = useUser();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setUser(res.data.user);
      setMessage("Signup successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
          <select name="role" onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
        <p className={message.includes("success") ? "success" : "error"}>{message}</p>
      </div>
    </div>
  );
};

export default Signup;
