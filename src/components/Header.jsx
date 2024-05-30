import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import CategBar from './CategBar';
// import MenuMobile from './MenuMobile';

export function Header() {
    const [searchValue, setSearchValue] = useState();

    const [categ, setCateg] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('men');
    const [display, setDisplay] = useState('hidden')
    const [cartDisplay, setCartDisplay] = useState('hidden')

    const menCategory = () => {
        setCateg(menCat);
        setSelectedCategory('men');
    }
    const womenCategory = () => {
        setCateg(womenCat);
        setSelectedCategory('women');
    }

    const handleHide = () => {
        setCartDisplay('hidden')
    }

    const handleHamburger = () => {
        console.log('clicked')
    }

    useEffect(() => {
        menCategory();
    }, [])

    const menCat = ['All', 'Trending', 'Casual wears', 'Classic-wears', 'Jeans', 'T-shirts and vests', 'Shirts', 'Baggy wears', 'Pants', 'Inner wears']
    const womenCat = ['All', 'Trending', 'Dresses', 'Pants', 'Accessories', 'Blouses']

    return (
        <>
            {/* <MenuMobile categ={categ} /> */}
            <header className='flex w-full justify-between items-center px-6 sticky top-0 z-20 bg-slate-200 relative'>
                <div className='flex items-center'>
                    <button onClick={handleHamburger} className='sm:hidden'><i className="fa-solid fa-bars" id='menuBar'></i></button>

                    <NavLink to={'/fashion-bazar'}><img className='w-32' src="logo.png" alt="logo" /></NavLink>
                </div>



                <nav>
                    <ul className='flex'>
                        <NavLink to='/fashion-bazar/men' className={`p-6 ${selectedCategory == 'men' ? 'bg-accent text-slate-200' : 'hover:underline'} cursor-pointer transition-all duration-300`} onClick={menCategory}>Men</NavLink>
                        <NavLink  className={`p-6 ${selectedCategory == 'women' ? 'bg-accent text-slate-200' : 'hover:underline'} cursor-pointer transition-all duration-300`} onClick={womenCategory}>Women</NavLink>
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
                        <button onClick={() => cartDisplay === 'hidden' ? setCartDisplay('block') : setCartDisplay('hidden')}><i className="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>

                <div className={`categoryBar absolute text-slate-200 flex flex-wrap py-4 gap-4 bg-accent items-center w-full h-auto z-20 justify-center left-0`}>
                    <CategBar categ={categ} path='/fashion-bazar/men' />
                </div>

                <div className={`user absolute right-0 top-16 h-auto w-48 bg-slate-200 z-30 p-2 ${display} flex-col`}>
                    <div className='text-accent flex gap-3 bg-slate-100 p-2 rounded-lg w-full justify-center'>
                        <NavLink exact='true' activeclassname="active" className='hover:underline' to='/fashion-bazar/log-in'>Login</NavLink>
                        <span>|</span>
                        <NavLink exact='true' activeclassname="active" className='hover:underline' to='/fashion-bazar/sign-up'>Signup</NavLink>
                    </div>
                    <div className='flex flex-col mt-4 gap-2'>
                        <NavLink className='hover:underline'>My Account</NavLink>
                        <NavLink className='hover:underline'>My Orders</NavLink>
                        <NavLink className='hover:underline'>Returns information</NavLink>
                    </div>
                </div>
                <Cart display={cartDisplay} handleHide={handleHide} />
            </header >
        </>
    )
}