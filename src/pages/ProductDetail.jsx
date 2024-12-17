import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import Alert from "../components/Alert";

const ProductDetail = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [alert, setAlert] = useState("");
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [highLightedIndex, setHighlightedIndex] = useState(0);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchProduct = async (url) => {
      try {
        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        console.error(
          "Error fetching product:",
          error.response?.data?.msg || error.message
        );
        setError("Failed to load product");
      }
    };

    const url = `https://storeapi.up.railway.app/api/product/${id}`;
    fetchProduct(url);
  }, [id]);
  const handleAddToCart = (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product._id);

    if (isProductInCart) {
      setAlert("Product is already in the cart");
    } else {
      dispatch(
        addToCart({
          id: product._id,
          title: product.title,
          price: product.price,
          images: product.images,
        })
      );
    }
  };
  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading product...</p>;
  }
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  const discountPrice = (product.discountRate / 100) * product.price;
  const afterDiscountPrice = Math.floor(product.price - discountPrice);
  return (
    <section className="flex w-full min-h-screen md:gap-16 gap-0 bg-light flex-col items-center md:py-10 py-0">
      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}

      {/* overview */}

      <div className="flex md:w-10/12 w-full items-center justify-center  md:gap-16 gap-8 shadow-lg md:py-6 py-0 pb-4 md:flex-row flex-col">
        {/* displaying images  */}

        <div className="flex flex-col gap-1 h-96 md:w-3/12 w-full">
          <div className="h-72 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              src={product.images[highLightedIndex]}
              alt={`image_${highLightedIndex}`}
            />
          </div>
          <div className="flex gap-2.5 overflow-x-auto">
            {product.images?.length > 0 &&
              product.images.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="w-20 h-20 overflow-hidden"
                    onClick={() => setHighlightedIndex(index)}
                  >
                    <img
                      key={index}
                      crossOrigin="anonymous"
                      src={img}
                      className="w-full h-full object-cover"
                      alt={`product-${index}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        {/* title sizes price and quantity of product  */}
        <div className="flex flex-col md:w-96 w-full gap-3 md:p-0 px-3">
          <div className="w-full mb-5">
            <p className="capitalize text-2xl font-bold mb-3">
              {product.title}
            </p>
            <div className="mt-1.5 flex gap-5">
              {product.discountRate ? (
                <>
                  <p className=" text-sm text-gray-700">
                    Rs {afterDiscountPrice}
                  </p>
                  <strike className="text-sm text-gray-700 italic">
                    Rs {product.price}
                  </strike>
                </>
              ) : (
                <p>Rs {product.price}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="size">Size :</label> &nbsp;&nbsp;
            {product.sizes && (
              <select name="size" id="size">
                {product.sizes.map((size, index) => {
                  return (
                    <option key={index} className="capitalize" value={size}>
                      {size}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div>
            <label htmlFor="color">Color :</label> &nbsp;&nbsp;
            {product.colors && (
              <select name="size" id="size">
                {product.colors.map((color, index) => {
                  return (
                    <option key={index} className="capitalize" value={color}>
                      {color}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="quantity">Quantity :</label> &nbsp;&nbsp;
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="bg-white px-2 rounded-full"
              >
                -
              </button>
              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="bg-white px-2 rounded-full"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex md:gap-2 gap-0 mt-6 md:static fixed bottom-0 left-0 z-50 w-full">
            <button className="block w-6/12 bg-secondary text-white py-4 text-sm font-medium transition hover:scale-105">
              Buy now
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product);
              }}
              className="block w-6/12 bg-yellow-400 py-4 text-sm font-medium transition hover:scale-105"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* description  */}

      <div className="w-11/12 pb-16">
        <h1 className="text-2xl font-bold my-5">
          Product description of {product.title}
        </h1>
        <article>
          <p>{product.description}</p>
        </article>
      </div>
    </section>
  );
};

export default ProductDetail;
