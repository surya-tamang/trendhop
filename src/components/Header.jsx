import React, { useState } from 'react';

export function Header() {
    const [searchValue, setSearchValue] = useState();
    return (
        <>
            <header className='flex w-full justify-between items-center px-6 sticky top-0 z-10 bg-slate-200'>

                <div>
                    <img className='w-32' src="logo.png" alt="logo" />
                </div>

                <nav>
                    <ul className='flex'>
                        <li className='hover:bg-accent p-6 hover:text-slate-200'>Men</li>
                        <li className='hover:bg-accent p-6 hover:text-slate-200'>Women</li>
                    </ul>
                </nav>

                <div className="searchBar flex gap-6">
                    <div className='flex gap-2 items-center'>
                        <input type="search" placeholder='search here..' className='p-2 border-b-2 focus:outline-accent text-accent rounded-md' onChange={searchValue} />
                        <button className='bg-transparent py-2 px-3 rounded-md hover:bg-accent border-2 border-accent hover:text-white text-accent'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div className='flex gap-5'>
                        <button><i className="fa-solid fa-user"></i></button>
                        <button><i className="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>

            </header>
        </>
    )
}