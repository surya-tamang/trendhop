import React from 'react'
export default function Heading({ heading }) {
    return (
        <>
            <h1 className='text-accent font-bold text-2xl ml-10 py-2 heading relative w-11/12'>{heading}</h1>
        </>
    )
}