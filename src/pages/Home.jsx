import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Heading from '../components/Heading'
import TopPicks from '../components/TopPicks'
import { topPickMen, topPickWomen } from '../components/Images'
import Banner from '../components/Banner'
import SummerImg from '../images/banner.png'
import NeedTypeCard from '../components/NeedTypeCard'

export default function Home() {

    const [topPick, setTopPick] = useState(topPickMen);
    const [selected, setSelected] = useState('men')

    const handleMenPicks = () => {
        setTopPick(topPickMen);
        setSelected('men');
    }
    const handleWomenPicks = () => {
        setTopPick(topPickWomen);
        setSelected('women');
    }
    return (
        <>

            <div className='w-full h-screen flex items-start justify-center pt-8'>
                <div className='swiper_box w-11/12 mt-10'>
                    <Hero />
                </div>
            </div>

            <Heading heading="Top Picks For You" />
            <div className='w-full h-auto flex items-center justify-center'>
                <div className='h-auto py-2 w-11/12'>
                    <div className='flex gap-4'>
                        <button onClick={handleMenPicks} className={`${selected === 'men' ? 'underline' : 'hover:underline'}`}>Men</button>
                        <button onClick={handleWomenPicks} className={`${selected === 'women' ? 'underline' : 'hover:underline'}`}>Women</button>
                    </div>
                    <TopPicks lists={topPick} />
                </div>
            </div>

            <Banner image={SummerImg} text="20% discount on summer outfits" />

            <Heading heading="Need Right Now" />

            <div className='w-full items-center flex justify-center my-10'>
                <NeedTypeCard />
            </div>

        </>
    )
}