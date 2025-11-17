import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaRupeeSign,
  FaBoxOpen,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import "./DashboardMetrics.css";

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalProductsSold: 0,
    totalEarnings: 0,
    salesList: [],
    earningsByDay: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("https://practice-ecom-backend.onrender.com/api/metrics/seller", {
          withCredentials: true,
        });
        setMetrics(res.data);
      } catch (err) {
        if (err.response?.status === 401) window.location.href = "/login";
        else if (err.response?.status === 403) window.location.href = "/no-permission";
        else console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <p className="loading-text">Loading metrics...</p>;

  return (
    <div className="dashboard-metrics-container">
      <h2 className="dashboard-title">
        <FaChartLine className="icon-main" /> Dashboard Metrics
      </h2>

      {/* Summary Boxes */}
      <div className="metrics-row">
        <div className="metric-box gradient-1">
          <div className="metric-icon">
            <FaRupeeSign />
          </div>
          <div className="metric-info">
            <h3>Total Earnings</h3>
            <p>₹{metrics.totalEarnings}</p>
          </div>
        </div>

        <div className="metric-box gradient-2">
          <div className="metric-icon">
            <MdOutlineSell />
          </div>
          <div className="metric-info">
            <h3>Products Sold</h3>
            <p>{metrics.totalProductsSold}</p>
          </div>
        </div>

        <div className="metric-box gradient-3">
          <div className="metric-icon">
            <FaBoxOpen />
          </div>
          <div className="metric-info">
            <h3>Total Products</h3>
            <p>{metrics.totalProducts}</p>
          </div>
        </div>
      </div>

      {/* Earnings Line Chart */}
      <div className="chart-section">
        <h3>
          <FaChartLine className="icon-sub" /> Daily Earnings (Last 7 Days)
        </h3>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={metrics.earningsByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Sales List */}
      <div className="sales-section">
        <h3>
          <FaShoppingCart className="icon-sub" /> Product-wise Sales
        </h3>
        {metrics.salesList.length === 0 ? (
          <p className="no-sales">No sales yet.</p>
        ) : (
          <div className="sales-list">
            {metrics.salesList
              .filter(item => item.quantitySold > 0)   // 👉 sirf un items ko allow karo jinka sold > 0 hai
              .map((item, i) => (
                <div className="sales-item" key={i}>
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                  />
                  <div className="sales-details">
                    <span className="sales-name">{item.name}</span>
                    <span className="sales-qty">{item.quantitySold} sold</span>
                  </div>
                </div>
          ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMetrics;
