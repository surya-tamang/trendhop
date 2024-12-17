import { useState } from "react";
import { fetchFilteredProducts } from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import CartBox from "./CartBox";
import Logo from "./Logo";
import { NavLink, useLocation } from "react-router-dom";
import MobNavs from "./MobNavs";
import DesktopNav from "./DesktopNav";

const Header = () => {
  const cartList = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const totalItem = cartList.length;
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const handleCart = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    const url = `https://storeapi.up.railway.app/api/product/filter?search=${searchValue}`;
    dispatch(fetchFilteredProducts(url));
  };
  const location = useLocation();
  const hideMobNav =
    location.pathname === "/trendhop/addProduct" ||
    location.pathname.startsWith("/trendhop/productDetails");
  return (
    <header className="flex w-full justify-between items-center md:px-16 px-6 py-4 border border-b-2 sticky top-0 bg-slate-50 shadow-lg z-40">
      {/* mobile view  */}

      {!hideMobNav && <MobNavs />}

      {/* desktop view  */}
      <NavLink to="/trendhop" className="hidden md:block">
        <Logo />
      </NavLink>

      <CartBox handleCart={handleCart} isOpen={isOpen} />
      <DesktopNav
        handleSearch={handleSearch}
        handleCart={handleCart}
        cartItems={totalItem}
        searchValue={searchValue}
        setIsAccountOpen={setIsAccountOpen}
        isAccountOpen={isAccountOpen}
      />
    </header>
  );
};

export default Header;
