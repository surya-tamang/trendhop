import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Components and Pages
import Header from "./components/Header";
import ResetScroll from "./hooks/ResetScroll";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AccountCenter from "./pages/AccountCenter";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";

// Custom hooks
import useAuth from "./hooks/useAuth";

const App = () => {
  // Calling the hook to check user status
  useAuth();

  // Retrieve user state from Redux
  const user = useSelector((state) => state.user);
  console.log("User state:", user);

  return (
    <BrowserRouter>
      <ResetScroll />
      <Header />
      <Routes>
        <Route exact path="/trendhop/" element={<Products />} />
        <Route exact path="/trendhop/addproduct" element={<AddProduct />} />
        <Route exact path="/trendhop/login" element={<Login />} />
        <Route exact path="/trendhop/signup" element={<Signup />} />
        <Route
          exact
          path="/trendhop/account_center"
          element={<AccountCenter />}
        />
        <Route exact path="/trendhop/cart" element={<CartPage />} />
        <Route
          exact
          path="/trendhop/productDetails/:id"
          element={<ProductDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
