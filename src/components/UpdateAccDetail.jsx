import { useState } from "react";

const UpdateAccDetail = ({ visible, setVisible }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    tole: "",
    near: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 ${
        visible ? "flex" : "hidden"
      } justify-center items-center z-50`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Update Profile
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={userData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="tole"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tole
            </label>
            <input
              type="text"
              id="tole"
              name="tole"
              value={userData.tole}
              onChange={handleChange}
              placeholder="Enter your tole"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="near"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Near
          </label>
          <input
            type="text"
            id="near"
            name="near"
            value={userData.near}
            onChange={handleChange}
            placeholder="Enter a nearby landmark"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center mt-4 gap-2">
          <button
            type="button"
            onClick={setVisible}
            className="bg-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccDetail;
