import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [rePwd, setRePwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [visibleRePwd, setVisibleRePwd] = useState(false);
  const [visiblePwd, setVisiblePwd] = useState(false);

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    return setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const url = "https://storeapi.up.railway.app/api/user/signup";
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    const { first_name, last_name, email, password } = newUser;

    // Basic Validation
    if (!first_name || !last_name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    if (password !== rePwd) {
      setError("Passwords do not match.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must include at least one uppercase letter, a number, a special character, and be 8-16 characters long."
      );
      return;
    }

    try {
      await axios.post(url, newUser);
      setSuccess("Account created successfully!");
      setTimeout(() => {
        navigate("/trendhop/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.msg || "Something went wrong. Please try again."
      );
    }
  };

  const isLabelDown = (field) => !newUser[field];

  return (
    <section
      className={`text-black flex items-center justify-center w-full pb-20 pt-10 min-h-screen`}
    >
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
        } flex flex-col justify-center items-center p-6 rounded-2xl gap-3`}
      >
        <h1 className="text-2xl font-bold text-primary mb-10">
          Register New Account
        </h1>

        {/* Name Fields */}
        <div className="flex w-full md:flex-row flex-col gap-2">
          {/* First Name */}
          <div className="border-2 border-primary w-full rounded-lg relative h-14">
            <input
              type="text"
              name="first_name"
              value={newUser.first_name}
              onChange={handleChange}
              className="border-none outline-none bg-transparent z-20 absolute top-3 left-5 w-full"
            />
            <label
              className={`absolute left-3 transition-all duration-200 ${
                isLabelDown("first_name") ? "top-3 text-base" : "-top-3 text-sm"
              } px-2 bg-light text-primary`}
            >
              First name
            </label>
          </div>

          {/* Last Name */}
          <div className="border-2 border-primary w-full rounded-lg relative h-14">
            <input
              type="text"
              name="last_name"
              value={newUser.last_name}
              onChange={handleChange}
              className="border-none outline-none bg-transparent z-20 absolute top-3 left-5  w-full"
            />
            <label
              className={`absolute left-3 transition-all duration-200 ${
                isLabelDown("last_name") ? "top-3 text-base" : "-top-3 text-sm"
              } px-2 bg-light text-primary`}
            >
              Last name
            </label>
          </div>
        </div>

        {/* Email */}
        <div className="border-2 border-primary w-full rounded-lg relative h-14">
          <input
            type="text"
            name="email"
            value={newUser.email}
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

        {/* Password Fields */}
        <div className="flex w-full md:flex-row flex-col gap-3">
          {/* Password */}
          <div className="border-2 border-primary w-full rounded-lg relative h-14">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setVisiblePwd(!visiblePwd)}
            >
              <i
                className={`fa-regular ${
                  visiblePwd ? "fa-eye" : "fa-eye-slash"
                } absolute right-3 top-4 z-30`}
              ></i>
            </button>
            <input
              type={`${visiblePwd ? "text" : "password"}`}
              name="password"
              value={newUser.password}
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

          {/* Confirm Password */}
          <div className="border-2 border-primary w-full rounded-lg relative h-14">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setVisibleRePwd(!visibleRePwd)}
            >
              <i
                className={`fa-regular ${
                  visibleRePwd ? "fa-eye" : "fa-eye-slash"
                } absolute right-3 top-4 z-30`}
              ></i>
            </button>
            <input
              type={`${visibleRePwd ? "text" : "password"}`}
              name="confirm_password"
              value={rePwd}
              onChange={(e) => setRePwd(e.target.value)}
              className="border-none outline-none bg-transparent z-20 absolute top-3 left-5  w-full"
            />
            <label
              className={`absolute left-3 transition-all duration-200 ${
                !rePwd ? "top-3 text-base" : "-top-3 text-sm"
              } px-2 bg-light text-primary`}
            >
              Confirm password
            </label>
          </div>
        </div>
        <div className="w-full flex justify-end">
          {error && <p className="text-red capitalize">{error}</p>}
          {success && <p className="text-green capitalize">{success}</p>}
        </div>

        <button
          type="submit"
          className="bg-secondary w-full py-3 text-white font-semibold bg-opacity-100 hover:bg-opacity-90 rounded-lg"
        >
          Sign Up
        </button>
        <div className="text-center space-x-1">
          <span>Already have an account?</span>
          <button
            type="button"
            className="underline"
            onClick={() => navigate("/trendhop/login")}
          >
            Login now
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
