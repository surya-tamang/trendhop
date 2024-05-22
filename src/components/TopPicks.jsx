import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';

import '../styles/swiper.css'

import { Navigation } from 'swiper/modules';

export default function TopPicks({ lists }) {
    return (
        <>
            <Swiper id='swiper'
                slidesPerView={4}
                navigation={true}
                spaceBetween={30}
                modules={[Navigation]}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {
                    lists.map((item, index) => {
                        const { image, title, price } = item;
                        return (
                            <SwiperSlide key={index} id='swiperSlide' className='flex flex-col'>
                                <img src={image} alt={title} />
                                <div className='des flex flex-col items-start gap-1'>
                                    <h1 className='font-semibold'>{title}</h1>
                                    <span>{price}</span>
                                    <div className='flex justify-between w-full gap-2'>
                                        <button className='bg-accent w-full py-1 text-slate-200'>Buy</button>

                                        <button className='bg-accent w-full py-1 text-slate-200 flex gap-2 items-center justify-center'><span>Add</span><i className="fa-solid fa-cart-shopping"></i></button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }


            </Swiper>
        </>
    )
}