import React, { useEffect, useState } from 'react'
import { menCasual } from '../components/Images'
import ShopButton from '../components/ShopButton';
export default function Men({ cartButton }) {


    return (
        <>
            <div className='w-full min-h-screen pt-14 flex items-center justify-center'>
                <div className='flex w-11/12 h-auto flex-wrap gap-6 py-6 justify-center'>
                    {
                        menCasual.map((item, index) => {
                            const { image, title, price } = item;
                            return (
                                <div className='w-48 h-72 bg-slate-300 flex flex-col p-2' key={index}>
                                    <div className='w-full h-10/12 overflow-hidden'>
                                        <img src={image} alt={title} className='w-full h-full object-cover' />
                                    </div>
                                    <div>
                                        <h1>{title}</h1>
                                        <p>{price}</p>
                                        <ShopButton cartButton={() => cartButton(item)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}