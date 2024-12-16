import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFilteredProducts } from "../redux/slices/productSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    category: "",
    sub_category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => {
      if (name === "search" && value) {
        prevFilter.category = "";
        prevFilter.sub_category = "";
        return { ...prevFilter, [name]: value };
      }
      return { ...prevFilter, [name]: value };
    });
  };

  const handleFilter = (currentFilter) => {
    let dynamicUrl = "";
    // Build the URL based on filters
    if (currentFilter.category && currentFilter.sub_category) {
      dynamicUrl = `https://storeapi.up.railway.app/api/product/filter?category=${currentFilter.category}&sub_category=${currentFilter.sub_category}`;
    } else if (currentFilter.category) {
      dynamicUrl = `https://storeapi.up.railway.app/api/product/filter?category=${currentFilter.category}`;
    } else if (currentFilter.sub_category) {
      dynamicUrl = `https://storeapi.up.railway.app/api/product/filter?sub_category=${currentFilter.sub_category}`;
    }
    if (dynamicUrl) {
      dispatch(fetchFilteredProducts(dynamicUrl));
    }
  };

  return (
    <div className="flex gap-5 items-center my-10 justify-between md:flex-row flex-col">
      <form className="flex gap-6 md:items-center w-10/12 flex-col md:flex-row">
        {/* <label htmlFor="category">Category:</label> &nbsp; &nbsp; */}
        <select
          name="category"
          className="bg-light p-1.5 capitalize outline-none rounded-lg"
          value={filter.category}
          onChange={handleChange}
        >
          <option value="">Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

        {/* <label htmlFor="sub_category">Sub Category:</label> &nbsp; &nbsp; */}
        <select
          name="sub_category"
          className="bg-light p-1.5 capitalize outline-none rounded-lg"
          value={filter.sub_category}
          onChange={handleChange}
        >
          <option value="">Sub-Category</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="winter">Winter</option>
          <option value="summer">Summer</option>
          <option value="sports">Sports</option>
          <option value="classic">Classic</option>
        </select>
        <button
          type="button"
          onClick={() => handleFilter(filter)}
          className="bg-secondary text-white rounded-3xl font-semibold px-4 py-1.5 hover:bg-orange-600"
        >
          filter
        </button>
      </form>
    </div>
  );
};

export default Filter;
