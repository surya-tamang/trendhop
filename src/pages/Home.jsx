import React from 'react'
import Hero from '../components/Hero'
import Heading from '../components/Heading'
import TopPicks from '../components/TopPicks'
import { topPickMen, topPickWomen } from '../components/Images'
export default function Home() {
    return (
        <>
            <div className='w-full min-h-screen'>
                <div className='w-full h-screen flex items-start justify-center pt-8'>
                    <div className='swiper_box w-10/12'>
                        <Hero />
                    </div>
                </div>
                <Heading heading="Top Picks For You" />
                <div className='h-auto py-2 px-11'>
                    <div className='flex gap-4'>
                        <h1>Men</h1>
                        <h1>Women</h1>
                    </div>
                    <TopPicks lists={topPickMen} />
                </div>
            </div>
        </>
    )
}