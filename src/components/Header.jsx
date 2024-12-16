import { useState } from "react";
import { fetchFilteredProducts } from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import CartBox from "./CartBox";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

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
  return (
    <header className="flex w-full justify-between items-center px-16 py-4 border border-b-2 sticky top-0 bg-slate-50 shadow-lg z-40">
      <NavLink to="/">
        <Logo />
      </NavLink>

      <CartBox handleCart={handleCart} isOpen={isOpen} />
      <form
        onSubmit={handleSearch}
        className="py-3 px-4 border-b-2 border-light md:w-4/12 w-10/12 relative shadow-md"
      >
        <input
          type="search"
          placeholder="Search.."
          name="search"
          onChange={handleSearch}
          value={searchValue}
          className="outline-none border-none bg-transparent w-full"
        />
        <button
          type="submit"
          className="absolute right-3 bg-white hover:bg-secondary hover:text-white h-10 w-10 rounded-full top-1 transition-all ease-in"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className="flex gap-8">
        <button
          className="text-black text-2xl relative"
          onClick={() => handleCart()}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="totalItem">{totalItem}</span>
        </button>
        <button
          onClick={() => setIsAccountOpen(!isAccountOpen)}
          className="text-black text-2xl border py-1.5 px-3 border-black rounded-full"
        >
          <i className="fa-solid fa-user"></i>
        </button>
        <div
          className={`${
            !isAccountOpen ? "hidden" : "flex"
          } h-auto absolute right-0 bg-red w-auto top-20 py-3 px-5 items-end flex-col rounded-md`}
        >
          {/* <h1 className="text-2xl font-bold capitalize">account center</h1> */}
          <div className="flex gap-3">
            <NavLink
              to="/trendhop/login"
              onClick={() => setIsAccountOpen(false)}
            >
              Sign In
            </NavLink>
            <span>|</span>
            <NavLink
              to="/trendhop/signup"
              onClick={() => setIsAccountOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
