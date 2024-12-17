import { NavLink } from "react-router-dom";
import logo from "/logo.png";
const MobNavs = () => {
  return (
    <div className="fixed bottom-0 w-full left-0 flex md:hidden items-center justify-evenly py-2 gap-6 z-20 bg-gray-100">
      <NavLink to="/trendhop" className="">
        <img src={logo} alt="logo" className="w-10 h-10" />
        {/* <span className="text-xs">home</span> */}
      </NavLink>
      <NavLink to="/trendhop/cart" className="flex flex-col items-center">
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="text-xs">cart</span>
      </NavLink>

      <NavLink
        to="/trendhop/account_center"
        className="flex flex-col items-center"
      >
        <i className="fa-solid fa-user"></i>
        <span className="text-xs">account</span>
      </NavLink>
    </div>
  );
};

export default MobNavs;
