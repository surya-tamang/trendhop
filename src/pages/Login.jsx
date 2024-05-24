import React from 'react'
import { NavLink } from 'react-router-dom'
import Google from '../images/thirdParty/search.png'
import Facebook from '../images/thirdParty/facebook.png'

const Login = () => {
    return (
        <>
            <div className='w-full min-h-screen flex items-center justify-between gap-12 px-9 pt-28 pb-8 flex-wrap'>

                <div><img src="logo.png" alt="logo" className='w-96' /></div>

                <form action="" className='bg-accent text-slate-200 p-5 rounded-xl w-1/3'>
                    <h1 className='text-2xl font-semibold my-6'>Welcome to fashion-bazar</h1>
                    <div className='flex flex-col gap-2'>
                        <input type="email" placeholder='email address' className='p-2 text-accent outline-none border-2 rounded-lg w-full' />
                        <input type="password" placeholder='password' className='p-2 text-accent outline-none border-2 rounded-lg w-full' />
                    </div>
                    <button className='my-6 bg-slate-200 text-accent font-semibold py-2 w-full rounded-md border-none hover:bg-slate-300'>Log In</button>

                    <div>
                        <h1 className='font-medium'>Or login with !</h1>
                        <div className='flex w-full gap-1 my-8'>
                            <NavLink className='flex w-full items-center justify-center gap-5 bg-slate-300 py-2 rounded-lg'>
                                <img src={Google} alt="google logo" className='w-9' />
                                <p className='text-accent font-semibold'>Google</p>
                            </NavLink>
                            <NavLink className='flex w-full items-center justify-center gap-5 bg-slate-300 py-2 rounded-lg'>
                                <img src={Facebook} alt="Facebook logo" className='w-9' />
                                <p className='text-accent font-semibold'>Facebook</p>
                            </NavLink>
                        </div>
                    </div>

                    <div className='flex mt-11'>
                        <p>Don't have an account?</p><NavLink to={'/fashion-bazar/sign-up'} className="underline ml-1">Sign-Up</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
