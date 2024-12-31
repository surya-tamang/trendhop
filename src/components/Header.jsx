import { useState } from "react";
import { fetchFilteredProducts } from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// import components
import MobNavs from "./navComponents/MobNavs";
import CartBox from "./CartBox";
import DesktopNav from "./navComponents/DesktopNav";

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
    location.pathname === "/trendhop/signup" ||
    location.pathname === "/trendhop/login" ||
    location.pathname.startsWith("/trendhop/productDetails");
  const headerContent = location.pathname === "/trendhop/";

  return (
    <>
      <header
        className={`${
          headerContent ? "flex" : "md:flex hidden"
        } w-full justify-between items-center md:px-16 px-6 py-4 border border-b-2 sticky top-0 bg-slate-50 shadow-lg z-30`}
      >
        {/* desktop view  */}
        <DesktopNav
          handleSearch={handleSearch}
          handleCart={handleCart}
          cartItems={totalItem}
          searchValue={searchValue}
          setIsAccountOpen={setIsAccountOpen}
          isAccountOpen={isAccountOpen}
        />

        {/* cart box  */}
        <CartBox handleCart={handleCart} isOpen={isOpen} setOpen={setIsOpen} />
      </header>
      {/* mobile view  */}
      {!hideMobNav && <MobNavs />}
    </>
  );
};

export default Header;
