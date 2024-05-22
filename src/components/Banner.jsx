import React from 'react'

const Banner = ({ image, text }) => {
    return (
        <>
            <div className='w-full h-64 flex items-center justify-center my-3'>
                <div className='w-11/12 h-full flex items-center justify-center bg-accent relative '>
                    <img src={image} alt="Banner immage" className='absolute w-full h-full object-cover'/>
                    <h1 className='font-semibold text-4xl z-10 text-slate-200'>{text}</h1>
                </div>
            </div>
        </>
    )
}

export default Banner
