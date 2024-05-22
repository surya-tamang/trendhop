import React from 'react'
import Hero from '../components/Hero'
import Heading from '../components/Heading'
import TopPicks from '../components/TopPicks'
import { topPickMen, topPickWomen } from '../components/Images'
import Banner from '../components/Banner'
import SummerImg from '../images/banner.png'
import NeedTypeCard from '../components/NeedTypeCard'

export default function Home() {
    return (
        <>

            <div className='w-full h-screen flex items-start justify-center pt-8'>
                <div className='swiper_box w-11/12'>
                    <Hero />
                </div>
            </div>
            <Heading heading="Top Picks For You" />
            <div className='w-full h-auto flex items-center justify-center'>
                <div className='h-auto py-2 w-11/12'>
                    <div className='flex gap-4'>
                        <h1>Men</h1>
                        <h1>Women</h1>
                    </div>
                    <TopPicks lists={topPickMen} />
                </div>
            </div>
            <Banner image={SummerImg} text="20% discount on summer outfits" />
            <Heading heading="Need Right Now" />
            <div className='w-full items-center flex justify-center my-6'>
                <NeedTypeCard />
            </div>

        </>
    )
}