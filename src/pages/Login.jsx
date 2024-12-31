import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visblePwd, setVisiblePwd] = useState(false);

  const handleChange = (e) => {
    setError("");
    setLoading("");
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const url = "https://storeapi.up.railway.app/api/user/login";
    // const url = "http://localhost:8848/api/user/login";
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const { email, password } = user;
    if (!email || !password) {
      setError("All fields required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Enter valid email");
      return;
    }
    try {
      const response = await axios.post(url, user, {
        withCredentials: true,
      });
      setLoading(false);
      localStorage.setItem("accessToken", response.data.accessToken);
      setTimeout(() => {
        navigate("/trendhop/");
      }, 500);
    } catch (err) {
      setError(
        err.response?.data?.msg || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isLabelDown = (field) => !user[field];

  return (
    <section className="text-black flex items-center justify-center w-full py-20">
      <button
        onClick={() => navigate("/trendhop/")}
        className="fixed top-8 left-8"
      >
        <FaArrowLeft />
      </button>
      <form
        onSubmit={handleSubmit}
        className={`md:w-6/12 w-10/12 bg-light ${
          error ? "border-red border-2 shadow-red shadow-inner" : ""
        } flex flex-col justify-center items-center p-6 rounded-2xl gap-4`}
      >
        <h1 className="md:text-2xl text-xl font-bold text-primary mb-10">
          Log in to your account
        </h1>

        {/* Email */}
        <div className="border-2 border-primary w-full rounded-lg relative h-14">
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border-none outline-none bg-transparent z-20 absolute top-3 left-5  w-full"
          />
          <label
            className={`absolute left-3 transition-all duration-200 ${
              isLabelDown("email") ? "top-3 text-base" : "-top-3 text-sm"
            } px-2 bg-light text-primary`}
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="border-2 border-primary w-full rounded-lg relative h-14">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setVisiblePwd(!visblePwd)}
          >
            <i
              className={`fa-regular ${
                visblePwd ? "fa-eye" : "fa-eye-slash"
              } absolute right-3 top-4 z-30`}
            ></i>
          </button>
          <input
            type={`${visblePwd ? "text" : "password"}`}
            name="password"
            value={user.password}
            onChange={handleChange}
            className="border-none outline-none bg-transparent z-20 absolute top-3 left-5  w-full"
          />
          <label
            className={`absolute left-3 transition-all duration-200 ${
              isLabelDown("password") ? "top-3 text-base" : "-top-3 text-sm"
            } px-2 bg-light text-primary`}
          >
            Password
          </label>
        </div>
        <div className="text-right w-full">
          <button
            type="button"
            onClick={() => navigate("/trendhop/forgot_password")}
            className="underline"
          >
            Forgot password
          </button>
        </div>

        {error && (
          <div className="w-full flex justify-end">
            <p className="text-red capitalize">{error}</p>
          </div>
        )}
        <button
          type="submit"
          className="bg-secondary w-full py-3 text-white font-semibold bg-opacity-100 hover:bg-opacity-90 rounded-lg capitalize"
        >
          {loading ? "logging in" : "log in"}
        </button>
        <div className="text-center space-x-1 mt-4 mb-2">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="underline"
            onClick={() => navigate("/trendhop/signup")}
          >
            Register now
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
