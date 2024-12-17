import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import AccountCenter from "./pages/AccountCenter";
import CartPage from "./pages/CartPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exct path="/trendhop" element={<Products />} />
          <Route exct path="/trendhop/addproduct" element={<AddProduct />} />
          <Route exct path="/trendhop/login" element={<Login />} />
          <Route exct path="/trendhop/signup" element={<Signup />} />
          <Route
            exct
            path="/trendhop/account_center"
            element={<AccountCenter />}
          />
          <Route exct path="/trendhop/cart" element={<CartPage />} />
          <Route
            exct
            path="/trendhop/productDetails/:id"
            element={<ProductDetail />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
