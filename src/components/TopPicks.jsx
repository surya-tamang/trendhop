import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export default function TopPicks({ lists }) {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper h-auto"
            >{
                    lists.map((item, index) => {
                        const { image, title } = item;
                        return (
                            <SwiperSlide className='h-full'>
                                <img src={image} alt={title} />
                            </SwiperSlide>
                        )
                    })
                }


            </Swiper>
        </>
    )
}