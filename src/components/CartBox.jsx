import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";

const CartBox = ({ handleCart, isOpen }) => {
  const cartList = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalItem = cartList.length;

  return (
    <div
      className={`absolute hidden top-24 right-0 ${
        !isOpen ? "hidden" : "md:block"
      }`}
    >
      <div
        className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <button
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
          onClick={() => handleCart()}
        >
          <span className="sr-only">Close cart</span>

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

        <div className="mt-4 space-y-6">
          {totalItem === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4 max-h-64 overflow-scroll">
              {cartList.map((item) => {
                const { id, title, price, images } = item;
                return (
                  <li className="flex items-center gap-4" key={id}>
                    <img
                      src={images[0]}
                      alt={title}
                      crossOrigin="anonymous"
                      className="w-16 h-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">{title}</h3>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <span className="text-gray-600">${price}</span>

                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={() => dispatch(removeFromCart(id))}
                      >
                        <span className="sr-only">Remove item</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="space-y-4 text-center">
            <a
              href="#"
              className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
            >
              View my cart ({totalItem})
            </a>

            <a
              href="#"
              className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
            >
              Checkout
            </a>

            <a
              href="#"
              className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
              Continue shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBox;
