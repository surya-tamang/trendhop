import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import Alert from "../components/Alert";
import { NavLink } from "react-router-dom";
import Filter from "../components/Filter";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";

const Products = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [alert, setAlert] = useState("");
  const dispatch = useDispatch();
  const {
    data: products,
    isLoading,
    isError,
  } = useSelector((state) => state.products);
  const productLists = Array.from(
    products.product ? products.product : products
  );

  useEffect(() => {
    const url = "https://storeapi.up.railway.app/api/product";
    dispatch(fetchProducts(url));
  }, []);

  if (alert) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  if (isLoading) return <Loading />;

  if (isError) return <ErrorPage />;

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
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}
      <header className="text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Our Product Collection
        </h2>
      </header>

      <Filter />
      {productLists.length > 0 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-16">
          {productLists?.map((item) => {
            const { _id, title, price, images, discountRate } = item;
            const discountPrice = (discountRate / 100) * price;
            const afterDiscountPrice = Math.floor(price - discountPrice);
            return (
              <NavLink
                to={`/trendhop/productDetails/${_id}`}
                key={_id}
                className="shadow-xl"
              >
                <div className="group block overflow-hidden">
                  <figure className="p-2">
                    <img
                      src={images[0]}
                      crossOrigin="anonymous"
                      alt={title}
                      className="h-64 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-72"
                    />
                  </figure>

                  <div className="relative border border-gray-100 bg-white p-6">
                    <h3 className="text-lg h-auto font-semibold text-gray-900 capitalize">
                      {title}
                    </h3>

                    <div className="mt-1.5 flex gap-5">
                      {discountRate ? (
                        <>
                          <p className=" text-base text-gray-700">
                            Rs {afterDiscountPrice}
                          </p>
                          <strike className="text-base text-gray-700 italic">
                            Rs {price}
                          </strike>
                        </>
                      ) : (
                        <p className="text-base">Rs {price}</p>
                      )}
                    </div>

                    {/* <form className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="block w-full rounded bg-secondary text-white p-4 text-sm font-medium transition hover:scale-105"
                      >
                        Buy now
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(item);
                        }}
                        className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    </form> */}
                  </div>
                </div>
              </NavLink>
            );
          })}
        </ul>
      ) : (
        <div className="w-full flex items-center justify-center mt-16">
          <h1>No products</h1>
        </div>
      )}
    </section>
  );
};

export default Products;
