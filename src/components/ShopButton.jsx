import React from 'react'

const ShopButton = () => {
    return (

        <div className='flex justify-between w-full gap-2'>
            <button className='bg-accent w-full py-1 text-slate-200'>Buy</button>

            <button className='bg-accent w-full py-1 text-slate-200 flex gap-2 items-center justify-center'><span>Add</span><i className="fa-solid fa-cart-shopping"></i></button>
        </div>

    )
}

export default ShopButton
