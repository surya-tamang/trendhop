import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Google from '../images/thirdParty/search.png'
import Facebook from '../images/thirdParty/facebook.png'

const Signup = () => {

    const [pwd, setPwd] = useState('');
    const [rePwd, setRePwd] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (rePwd) {
            pwd !== rePwd ? setError("Password not matched") : setError('');
        }
    }, [pwd, rePwd])


    return (
        <div className='w-full min-h-screen flex items-center justify-between gap-12 px-9 pt-28 pb-8 flex-wrap'>

            <div><img src="logo.png" alt="logo" className='w-96' /></div>

            <form action="" className='bg-accent text-slate-200 p-5 rounded-xl w-1/3' onSubmit={(e) => e.preventDefault()}>
                <h1 className='text-2xl font-semibold my-6 underline'>Register Now</h1>
                <div>
                    <h1 className='font-medium'>Sign up with !</h1>
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

                <h1 className='font-medium mb-4'>Sign up with email</h1>

                <div className='flex gap-2 my-2'>
                    <input type="text" placeholder='first name' className='p-2 text-accent outline-none border-2 rounded-lg w-full' />
                    <input type="text" placeholder='last name' className='p-2 text-accent outline-none border-2 rounded-lg w-full' />
                </div>
                <div className='flex flex-col gap-2'>
                    <input type="email" placeholder='email address' className='p-2 text-accent outline-none border-2 rounded-lg w-full' />
                    <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" placeholder='password' className='p-2 text-accent outline-none border-2 rounded-lg w-full' />
                    <input value={rePwd} onChange={(e) => setRePwd(e.target.value)} type="password" placeholder='confirm password' className='p-2 text-accent outline-none border-2 rounded-lg w-full' />
                </div>
                <div className='h-2'></div>
                <span className='text-red-400'>{error}</span>
                <button type='submit' className='my-6 bg-slate-200 text-accent font-semibold py-2 w-full rounded-md border-none hover:bg-slate-300'>Sign-Up</button>
                <div className='flex mt-11'>
                    <p>Already have an account?</p><NavLink to={'/fashion-bazar/log-in'} className="underline ml-1">Log-In</NavLink>
                </div>
            </form>
        </div>
    )
}

export default Signup
