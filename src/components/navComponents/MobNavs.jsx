import { NavLink } from "react-router-dom";
import logo from "/logo.png";
import useScrollPosition from "../../hooks/ScrollPos";
import { useSelector } from "react-redux";
const MobNavs = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  const isVisible = useScrollPosition();
  return (
    <div
      className={`fixed bottom-0 w-full left-0 ${
        isVisible ? "flex" : "hidden"
      } md:hidden items-center justify-evenly py-3 gap-6 z-20 bg-gray-100`}
    >
      <NavLink to="/trendhop/" className="border-2 rounded-full">
        <img src={logo} alt="logo" className="w-10 h-10" />
        {/* <span className="text-xs">home</span> */}
      </NavLink>
      <NavLink to="/trendhop/cart" className="flex flex-col items-center">
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="text-xs">cart</span>
      </NavLink>

      <NavLink
        to={isLoggedIn ? "/trendhop/user_profile" : "/trendhop/login"}
        className="flex flex-col items-center"
      >
        <i className="fa-solid fa-user"></i>
        <span className="text-xs">account</span>
      </NavLink>
    </div>
  );
};

export default MobNavs;
