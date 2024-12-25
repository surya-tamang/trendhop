import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import LoginBox from "../LoginBox";

const DesktopNav = ({
  handleSearch,
  searchValue,
  handleCart,
  setIsAccountOpen,
  isAccountOpen,
  cartItems,
}) => {
  const { logout } = useAuth();
  const location = useLocation();
  const dropdownRef = useRef(null); // Reference for the dropdown container
  const accountButtonRef = useRef(null); // Reference for the account button
  const { isLoggedIn } = useSelector((state) => state.user);

  const displaySearchBox = location.pathname === "/trendhop/";

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        accountButtonRef.current &&
        !accountButtonRef.current.contains(event.target)
      ) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsAccountOpen]);

  return (
    <>
      {/* Logo */}
      <NavLink to="/trendhop/" className="hidden md:block">
        <Logo />
      </NavLink>
      {/* Search Box */}
      {displaySearchBox && (
        <form className="py-3 px-4 border-b-2 border-light md:w-4/12 w-full relative shadow-md">
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
            className="absolute right-3 bg-secondary text-white h-10 w-10 rounded-full top-1"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      )}
      {/* Cart and Account Buttons */}
      <div className="md:flex gap-8 hidden">
        {/* Cart Button */}
        <button className="text-black text-2xl relative" onClick={handleCart}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="totalItem">{cartItems}</span>
        </button>

        {/* Account Button */}
        <button
          ref={accountButtonRef} // Reference for the account button
          onClick={() => setIsAccountOpen((prev) => !prev)} // Toggle dropdown visibility
          className="text-black text-2xl border py-1.5 px-3 border-black rounded-full"
        >
          <i className="fa-solid fa-user"></i>
        </button>

        {/* Account Dropdown */}
        <div
          ref={dropdownRef} // Attach the ref here
          className={`${
            !isAccountOpen ? "hidden" : "flex"
          } h-auto absolute right-2 bg-gray-200 w-auto top-24 py-3 px-5 items-end flex-col rounded-md border-2 border-black`}
        >
          {isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <NavLink className="hover:underline">View profile</NavLink>
              <NavLink className="hover:underline">Account security</NavLink>
              <button
                onClick={logout}
                className="bg-orange-600 py-1 mt-6 text-white capitalize font-semibold rounded-sm"
              >
                log out
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to="/trendhop/login"
                onClick={() => setIsAccountOpen(false)}
              >
                Sign In
              </NavLink>
              <span>|</span>
              <NavLink
                to="/trendhop/login"
                onClick={() => setIsAccountOpen(false)}
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
     
    </>
  );
};

export default DesktopNav;
