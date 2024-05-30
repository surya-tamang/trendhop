import React from 'react'

const MenuMobile = ({ categ }) => {
    return (
        <div className='absolute w-full h-screen bg-red-200 z-30'>
            <div>
                <button>Men</button>
                <button>Women</button>
            </div>
            <div className='flex flex-col p-5 justify-center items-start gap-5'>
                {
                    categ
                }
            </div>

        </div>
    )
}

export default MenuMobile
