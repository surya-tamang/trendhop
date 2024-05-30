import React from 'react'
import { NavLink } from 'react-router-dom'

const CategBar = ({ categ, path }) => {
    return (
        categ.map((category, index) => {
            return (
                <React.Fragment key={index}>
                    <NavLink to={path} className='hover:underline transition-all duration-300 cursor-pointer'>{category}</NavLink>
                    {index < categ.length - 1 && <span>|</span>}
                </React.Fragment>
            )
        })
    )
}

export default CategBar
