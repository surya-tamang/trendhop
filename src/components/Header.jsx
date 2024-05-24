import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
    const [searchValue, setSearchValue] = useState();

    const [menCatOp, setMenCatOp] = useState(100);
    const [selectedCategory, setSelectedCategory] = useState('men');
    const [display, setDisplay] = useState('hidden')

    const menCategory = () => {
        setMenCatOp(100);
        setSelectedCategory('men');
    }
    const womenCategory = () => {
        setSelectedCategory('women');
    }

    const menCat = ['All', 'Trending', 'Casual wears', 'Classic-wears', 'Jeans', 'T-shirts and vests', 'Shirts', 'Baggy wears', 'Pants', 'Inner wears']

    return (
        <>
            <header className='flex w-full justify-between items-center px-6 sticky top-0 z-20 bg-slate-200 relative'>

                <NavLink to={'/fashion-bazar'}><img className='w-32' src="logo.png" alt="logo" /></NavLink>

                <nav>
                    <ul className='flex'>
                        <li className={`p-6 ${selectedCategory == 'men' ? 'bg-accent text-slate-200' : 'hover:underline'} cursor-pointer transition-all duration-300`} onClick={menCategory}>Men</li>
                        <li className={`p-6 ${selectedCategory == 'women' ? 'bg-accent text-slate-200' : 'hover:underline'} cursor-pointer transition-all duration-300`} onClick={womenCategory}>Women</li>
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
                        <button onClick={() => display === 'hidden' ? setDisplay('flex') : setDisplay('hidden')}><i className="fa-solid fa-user"></i></button>
                        <button><i className="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>

                <div className={`categoryBar absolute text-slate-200 flex gap-4 bg-accent items-center w-full h-16 z-20 justify-center left-0 opacity-${menCatOp}`}>
                    {
                        menCat.map((category, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <li className='hover:underline transition-all duration-300 cursor-pointer'>{category}</li>
                                    {index < menCat.length - 1 && <span>|</span>}
                                </React.Fragment>
                            )
                        })
                    }
                </div>

                <div className={`user absolute right-0 top-16 h-auto w-48 bg-slate-200 z-30 p-2 ${display} flex-col`}>
                    <div className='text-accent flex gap-3'>
                        <NavLink exact='true' activeclassname="active" to='/fashion-bazar/log-in'>Login</NavLink>
                        <span>|</span>
                        <NavLink exact='true' activeclassname="active" to='/fashion-bazar/sign-up'>Signup</NavLink>
                    </div>
                    <div className='flex flex-col mt-4 gap-2'>
                        <NavLink>My Account</NavLink>
                        <NavLink>My Orders</NavLink>
                        <NavLink>Returns information</NavLink>
                    </div>
                </div>
                {/* <div className='cart'>

                </div> */}
            </header >
        </>
    )
}