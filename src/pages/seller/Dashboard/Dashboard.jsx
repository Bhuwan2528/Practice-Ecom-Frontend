import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import AddProduct from "../AddProduct/AddProduct";
import DashboardMetrics from "../DashboardMetrics/DashboardMetrics";
import ManageProducts from "../ManageProducts/ManageProducts";
import SellerProfile from "../SellerProfile/SellerProfile";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard"); // default view: dashboard

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://practice-ecom-backend.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) window.location.href = "/login";
        else if (err.response?.status === 403) window.location.href = "/no-permission";
        else console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <ul>
          <li
            className={view === "dashboard" ? "active" : ""}
            onClick={() => setView("dashboard")}
          >
            📊 Dashboard
          </li>
          <li
            className={view === "add" ? "active" : ""}
            onClick={() => setView("add")}
          >
            ➕ Add Product
          </li>
          <li
            className={view === "manage" ? "active" : ""}
            onClick={() => setView("manage")}
          >
            🛠 Manage Products
          </li>
          <li
            className={view === "profile" ? "active" : ""}
            onClick={() => setView("profile")}
          >
            👤 Profile
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {view === "dashboard" && <DashboardMetrics/>}
        {view === "add" && <AddProduct/>}
        {view === "manage" && <ManageProducts/>}
        {view === "profile" && <SellerProfile/>}
      </div>
    </div>
  );
};

export default Dashboard;
