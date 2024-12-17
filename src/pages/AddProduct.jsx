import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    discountRate: "",
    description: "",
    category: "",
    sub_category: "",
    colors: "",
    sizes: "",
    images: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setError("");
  };
  const [pending, setPending] = useState(false);
  const handleFileChange = (e) => {
    setError("");
    const files = Array.from(e.target.files);
    setProduct((prev) => {
      const updated = [...prev.images, ...files];
      return { ...prev, images: updated };
    });
  };
  const removeProduct = (index) => {
    setProduct((prev) => {
      const updated = prev.images.filter((_, i) => i !== index);
      return { ...product, images: updated };
    });
  };
  const handleSubmit = async (e) => {
    setPending(true);
    e.preventDefault();
    console.log(product);
    const {
      title,
      price,
      discountRate,
      description,
      category,
      sub_category,
      colors,
      sizes,
      images,
    } = product;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("discountRate", discountRate);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("sub_category", sub_category);
    formData.append("colors", colors);
    formData.append("sizes", sizes);
    images.forEach((img) => formData.append("images", img));
    if (
      !title ||
      !price ||
      !description ||
      !category ||
      !sub_category ||
      !colors ||
      !sizes
    ) {
      setError("All fields required");
      // return;
    } else if (colors.includes(" ")) {
      setError("Separate colors with ','");
      return;
    } else if (sizes.includes(" ")) {
      setError("Separate sizes with ','");
      return;
    } else {
      addToDb(formData);
    }
  };
  const addToDb = async (data) => {
    const url = "https://storeapi.up.railway.app/api/product";
    try {
      const response = await axios.post(url, data);
      console.log(response);
      setSuccess("Product added");
      setPending(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError(error.response.data.msg || "Something went wrong");
    }
  };
  return (
    <section className="w-full min-h-screen flex justify-center items-center py-10 md:flex-row-reverse flex-col gap-10">
      {product.images.length > 0 && (
        <div className="flex flex-wrap gap-8 w-96">
          {product.images.map((img, index) => {
            return (
              <div key={index} className="w-28 h-28 relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`product_${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeProduct(index)}
                  className="bg-slate-400 absolute -top-4 p-2 rounded-full -right-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      <form
        action=""
        className="flex flex-col gap-4 w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-10">Add new product</h1>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        <input
          type="text"
          onChange={handleChange}
          value={product.title}
          placeholder="Product title"
          name="title"
          className="border-2 border-gray-400 p-2 w-full"
        />
        <div className="flex gap-2 w-full">
          <input
            type="number"
            onChange={handleChange}
            value={product.price}
            placeholder="Price"
            name="price"
            className="border-2 border-gray-400 p-2 w-full"
          />
          <input
            type="number"
            value={product.discountRate}
            onChange={handleChange}
            placeholder="Discount Rate"
            name="discountRate"
            className="border-2 border-gray-400 p-2 w-full"
          />
        </div>

        <input
          type="text"
          onChange={handleChange}
          value={product.colors}
          placeholder="Availabe colors"
          name="colors"
          className="border-2 border-gray-400 p-2 w-full"
        />
        <input
          type="text"
          onChange={handleChange}
          value={product.sizes}
          placeholder="Availabe sizes"
          name="sizes"
          className="border-2 border-gray-400 p-2 w-full"
        />
        <textarea
          type=""
          onChange={handleChange}
          value={product.description}
          placeholder="Description"
          name="description"
          className="border-2 border-gray-400 p-2 resize-none w-full min-h-32"
        />

        <select
          name="category"
          onChange={handleChange}
          className="border-2 border-gray-400 w-full py-2"
          value={product.category}
        >
          <option value="">Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

        <select
          name="sub_category"
          onChange={handleChange}
          className="border-2 border-gray-400 w-full py-2"
          value={product.sub_category}
        >
          <option value="">Sub Category</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="winter">Winter</option>
          <option value="summer">Summer</option>
          <option value="sports">Sports</option>
          <option value="classic">Classic</option>
        </select>

        <div className="w-full flex justify-end">
          {error && (
            <span className="capitalize font-base text-red">{error}</span>
          )}
          {success && (
            <span className="capitalize font-base text-green">{success}</span>
          )}
        </div>
        <button
          className="py-2 w-full bg-secondary text-white font-bold mt-4"
          disabled={pending}
        >
          {pending ? "Adding..." : "Add"}
        </button>
      </form>
    </section>
  );
};
export default AddProduct;
