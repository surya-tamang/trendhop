import React from 'react';
import firstImg from '../images/heroimg.png'

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function Hero() {
    const highlight = [

        { image: firstImg, link: "hello.com" },
        { image: firstImg, link: "hello.com" },
        { image: firstImg, link: "hello.com" },
        { image: firstImg, link: "hello.com" }

    ]
    return (
        <>
            <Swiper
                navigation={true}
                pagination={{ clickable: true, }}
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                className="mySwiper overflow-x-hidden h-full w-full">
                {
                    highlight.map((item, index) => {
                        const { image, link } = item;
                        return (
                            <SwiperSlide key={index} className='overflow-hidden bg-black px-2 h-full'>
                                <div className='w-11/12 rounded-md overflow-hidden relative'>
                                    <img src={image} alt="image" className='w-full h-full z-0' />
                                    <div className='w-full absolute z-10 top-1/2  text-slate-200 flex items-center justify-center flex-col'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, temporibus!</p>
                                        <button className='border-2 border-slate-200 p-2 rounded-md hover:bg-accent hover:border-none'>See more</button>
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