import React, { useState } from 'react'

const Cart = ({ display, handleHide, cartList = [] }) => {
    // const [listNum, setListNUm] = useState(0);
    // console.log('carlist items are', cartList);
    return (
        <div
            className={`absolute w-screen max-w-sm border border-gray-600 bg-slate-200 px-4 py-8 sm:px-6 lg:px-8 z-20 top-16 right-0 ${display}  max-h-screen`}
            aria-modal="true"
            role="dialog"
            tabIndex="-1"
        >
            <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110" onClick={handleHide}>
                <span className="sr-only">Close cart</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="mt-4 space-y-6 overflow-y-scroll max-h-96 py-3">
                <ul className="space-y-4">
                    {
                        cartList.map((item, index) => {
                            const { image, price, title } = item;
                            return (
                                <li className="flex items-center gap-4" key={index}>
                                    <img src={image} alt={title} className="size-16 rounded object-cover" />

                                    <div>
                                        <h3 className="text-sm text-gray-900">{title}</h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Size:</dt>
                                                <dd className="inline">XXS</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">Price:</dt>
                                                <dd className="inline">{price}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </li>
                            )

                        })
                    }
                </ul>
            </div>

            <div className="space-y-4 text-center">
                <a
                    href="#"
                    className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                >
                    View my cart({cartList.length})
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
    )
}

export default Cart
