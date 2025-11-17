import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoPermission.css";

const NoPermission = () => {
  const navigate = useNavigate();

  return (
    <div className="no-permission-container">
      <div className="no-permission-card">
        <div className="no-permission-emoji">🚫</div>
        <h2 className="no-permission-title">Access Denied</h2>
        <p className="no-permission-text">
          You don’t have permission to view this page. Please contact the
          administrator if you think this is an error.
        </p>
        <button className="no-permission-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NoPermission;
