import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("User fetch failed:", err);
      }
    };
    fetchUser();
  }, []);

  // ✅ handle profile click
  const handleProfileClick = () => {
    if (!user) return;
    if (user.role === "seller") {
      navigate("/seller-dashboard");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 onClick={() => navigate("/")}>
          Quick<span>Commerce</span>
        </h1>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <p>
              Hi, <span>{user.name}</span>
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="profile"
              className="profile-pic"
              onClick={handleProfileClick} // 👈 click action added
              style={{ cursor: "pointer" }}
            />
          </>
        ) : (
          <>
            <button className="nav-btn login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="nav-btn signup-btn" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
