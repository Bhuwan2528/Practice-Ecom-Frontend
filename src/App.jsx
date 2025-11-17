import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/user/Form/Signup";
import Login from "./pages/user/Form/Login";
import AddProduct from "./pages/seller/AddProduct/AddProduct";
import Products from "./pages/user/Products/Products";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/user/Home/Home";
import Dashboard from "./pages/seller/Dashboard/Dashboard";
import NoPermission from "./pages/user/NoPermission/NoPermission";
import EditProduct from "./pages/seller/EditProduct/EditProduct";
import ManageProducts from "./pages/seller/ManageProducts/ManageProducts";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/no-permission" element={<NoPermission/>} />



        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/seller-dashboard" element={<Dashboard />} />
        <Route path="/dashboard/edit-product/:id" element={<EditProduct />} />
        <Route path="dashboard/manage-products" element={<ManageProducts/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
