import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// components
import { addToCart } from "../redux/slices/cartSlice";
import Alert from "../components/Alert";
import useScrollPosition from "../hooks/ScrollPos";
import Loading from "../components/Loading";
import LoginBox from "../components/auth_components/LoginBox";
import SuccessNoti from "../components/SuccessNoti";
import PaymentModal from "../components/PaymentModal";

const ProductDetail = () => {
  const { user } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);
  const [alert, setAlert] = useState("");
  const [isAddedToCart, setIsAddedToCart] = useState("");
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [highLightedIndex, setHighlightedIndex] = useState(0);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const isVisible = useScrollPosition();
  const [afterDiscPrice, setAfterDiscPrice] = useState();
  const [isVisibleSignin, setIsVisibleSignin] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [success, setSuccess] = useState(null);
  //  handling order details

  const [orderDetails, setOrderDetails] = useState({
    userId: "",
    items: {
      productId: id,
      quantity: quantity,
      color: "",
      size: "",
    },
    totalPrice: "",
    paymentMethod: "",
    paymentStatus: "",
  });

  // handling order Details changes
  const handleChange = (e) => {
    const applicablePrice = product.discountRate
      ? afterDiscPrice
      : product.price;
    const { name, value } = e.target;
    setOrderDetails((prevOrder) => {
      const updatedItems = { ...prevOrder.items, [name]: value };
      const updatedTotalPrice = applicablePrice * Number(updatedItems.quantity);

      return {
        ...prevOrder,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    });
  };

  const confirmOrder = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const order = {
      userId: user?._id,
      items: [
        {
          productId: product?._id,
          quantity: orderDetails.items.quantity,
          color: orderDetails.items.color,
          size: orderDetails.items.size,
        },
      ],
      totalPrice: orderDetails.totalPrice,
      paymentMethod: selectedPaymentMethod,
      paymentStatus: "pending",
    };
    // console.log(order);
    try {
      const response = await axios.post(
        "http://localhost:8848/api/order",
        order
      );
      setIsPaymentModalVisible(false);
      setSuccess("Order Confirmed");
      setTimeout(() => {
        setSuccess(null);
      }, 1000);
      // console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // handlle fetching product

  useEffect(() => {
    const fetchProduct = async (url) => {
      try {
        const response = await axios.get(url);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        const discountPrice =
          (fetchedProduct.discountRate / 100) * fetchedProduct.price;
        const afterDiscountPrice = Math.floor(
          fetchedProduct.price - discountPrice
        );
        setAfterDiscPrice(afterDiscountPrice);
        setOrderDetails((prev) => ({
          ...prev,
          items: {
            ...prev.items,
            userId: user?.userId || "",
            color: fetchedProduct.colors[0],
            size: fetchedProduct.sizes[0],
          },
          totalPrice: afterDiscountPrice || fetchedProduct.price,
        }));
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
  }, [id, user]);

  const handleAddToCart = (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product._id);

    if (isProductInCart) {
      setAlert("Product is already in the cart");
    } else {
      setIsAddedToCart("Product added");
      dispatch(
        addToCart({
          id: product._id,
          title: product.title,
          price: product.price,
          images: product.images,
        })
      );
      setTimeout(() => {
        setIsAddedToCart(null);
      }, 1000);
    }
  };

  // handling qunatity

  const handleDecrement = () => {
    if (quantity > 1) {
      const applicablePrice = product.discountRate
        ? afterDiscPrice
        : product.price;

      setQuantity((prev) => prev - 1);
      setOrderDetails((prev) => ({
        ...prev,
        items: {
          ...prev.items,
          quantity: quantity - 1,
        },
        totalPrice: applicablePrice * (quantity - 1),
      }));
    }
  };

  const handleIncrement = () => {
    const applicablePrice = product.discountRate
      ? afterDiscPrice
      : product.price;

    setQuantity((prev) => prev + 1);
    setOrderDetails((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        quantity: quantity + 1,
      },
      totalPrice: applicablePrice * (quantity + 1),
    }));
  };

  // display the status of product fetch

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <Loading />;
  }

  return (
    <section className="flex w-full min-h-screen md:gap-16 gap-0 bg-light flex-col items-center md:py-10 py-0">
      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}
      {isAddedToCart && <SuccessNoti message={isAddedToCart} />}
      {success && <SuccessNoti message={success} />}
      <LoginBox
        visible={isVisibleSignin}
        close={() => setIsVisibleSignin(false)}
      />
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
                  <p className=" text-base text-gray-700 font-bold">
                    Rs {afterDiscPrice}
                  </p>
                  <strike className="text-base text-gray-700 italic">
                    Rs {product.price}
                  </strike>
                </>
              ) : (
                <p className="font-bold text-base">Rs {product.price}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="size">Size :</label> &nbsp;&nbsp;
            {product.sizes && (
              <select name="size" id="size" onChange={handleChange}>
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
              <select name="color" id="color" onChange={handleChange}>
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

          {/* quantity  */}
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
                onClick={handleIncrement}
                className="bg-white px-2 rounded-full"
              >
                +
              </button>
            </div>
          </div>

          {/* buy and cart buttons  */}

          {/* desktop view  */}
          <div className={`gap-0 mt-6 md:flex hidden w-full`}>
            <button
              onClick={() =>
                user ? setIsPaymentModalVisible(true) : setIsVisibleSignin(true)
              }
              className="block w-6/12 bg-secondary text-white py-4 text-sm font-medium transition hover:scale-105"
            >
              Buy now
            </button>
            <button
              onClick={() =>
                user ? handleAddToCart(product) : setIsVisibleSignin(true)
              }
              className="block w-6/12 bg-yellow-400 py-4 text-sm font-medium transition hover:scale-105"
            >
              Add to cart
            </button>
          </div>

          {isPaymentModalVisible && (
            <PaymentModal
              close={() => setIsPaymentModalVisible(false)}
              setPaymentMethod={(e) => setSelectedPaymentMethod(e.target.value)}
              paymentMethod={selectedPaymentMethod}
              onConfirm={confirmOrder}
            />
          )}

          {/* mobile view  */}

          <div
            className={`${
              isVisible ? "flex" : "hidden"
            } md:gap-2 gap-0 mt-6 md:hidden fixed bottom-0 left-0 z-50 w-full`}
          >
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
