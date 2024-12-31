import { FaCircleUser } from "react-icons/fa6";
import { FaUserEdit, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// components
import UpdateAccDetail from "../components/UpdateAccDetail";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [isVisbleUpdateBox, setIsVisbleUpdateBox] = useState(false);
  const [isVisibleProfile, setIsVisibleProfile] = useState(false);
  useEffect(() => {
    console.log(user);

    isVisbleUpdateBox || isVisibleProfile
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll");
  }, [isVisbleUpdateBox, isVisibleProfile]);
  return (
    <main className="min-h-screen w-full flex flex-col items-center p-5">
      {/* Header Section */}
      <NavLink
        to="/trendhop/"
        className="bg-gray-200 p-2 rounded-full absolute left-5"
      >
        <FaArrowLeft />
      </NavLink>
      <header className="flex items-center flex-col">
        <div className="relative h-32 w-32 rounded-full border-gray-400 border-4">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.first_name}
              className="w-full h-full"
            />
          ) : (
            <FaCircleUser className="w-full h-full text-gray-400" />
          )}

          <button
            onClick={() => setIsVisibleProfile(true)}
            className="absolute bottom-0 -right-5 text-gray-700"
          >
            <FaUserEdit />
          </button>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.first_name} {user?.last_name}
        </h1>
        <p className="text-gray-600">{user?.email}</p>
      </header>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${
          isVisibleProfile ? "flex" : "hidden"
        } justify-center items-center z-50`}
      >
        <form className=" bg-white p-4 flex flex-wrap gap-4 rounded-lg">
          <label htmlFor="profile image" className="sr-only">
            Image
          </label>
          <input
            type="file"
            accept="/jpg,/jpeg,/png"
            name="profile"
            className="w-full"
          />
          <button
            type="submit"
            className="bg-lime-700 text-white py-2 px-4 rounded-md hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-lime-800 w-full"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setIsVisibleProfile(false)}
            className="bg-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
          >
            Cancel
          </button>
        </form>
      </div>
      {/* Separator */}
      <hr className="w-full max-w-xl my-6 border-gray-300" />

      {/* Navigation Section */}
      <nav className="mb-8">
        <ul className="flex justify-center gap-6 text-gray-700 text-lg">
          <li className="hover:text-gray-900 cursor-pointer">My Information</li>
          <li className="hover:text-gray-900 cursor-pointer">My Orders</li>
        </ul>
      </nav>

      {/* Information Section */}
      <section className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Details
        </h2>
        <dl className="space-y-4 text-gray-700">
          {/* Name */}
          <div className="flex justify-between flex-wrap">
            <dt className="font-medium">Name:</dt>
            <dd>
              {user?.first_name} {user?.last_name}
            </dd>
          </div>

          {/* Email */}
          <div className="flex justify-between flex-wrap">
            <dt className="font-medium">Email:</dt>
            <dd>{user?.email}</dd>
          </div>
          {/* Phone */}
          <div className="flex justify-between flex-wrap">
            <dt className="font-medium">Phone:</dt>
            <dd>{user?.phone}</dd>
          </div>

          {/* Address */}
          <div>
            <dt className="font-medium">Address:</dt>
            <dd className="ml-0 md:ml-4 mt-2 space-y-1">
              <div>City: {user?.address?.city}</div>
              <div>Tole: {user?.address?.tole}</div>
              <div>Near: {user?.address?.near}</div>
            </dd>
          </div>
        </dl>
        <button
          onClick={() => setIsVisbleUpdateBox(true)}
          className="bg-blue-600 text-white mt-4 px-3 py-1 font-semibold rounded-lg hover:bg-blue-700"
        >
          Update Profile
        </button>
      </section>
      <UpdateAccDetail
        visible={isVisbleUpdateBox}
        setVisible={() => setIsVisbleUpdateBox(false)}
      />
    </main>
  );
};

export default UserProfile;
