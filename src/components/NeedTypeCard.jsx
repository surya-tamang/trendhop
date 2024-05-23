import React from 'react'
import lightweight from '../images/needTypes/lightweight.png'
import athletic from '../images/needTypes/athletic.png'
import innerwear from '../images/needTypes/innerwear.png'

const NeedTypeCard = () => {
    const NeedType = [
        { image: lightweight, title: 'Lightweight Outfits' },
        { image: athletic, title: 'Athletic outifit' },
        { image: innerwear, title: 'Inner Wears' },
    ]
    return (
        <>
            <div className='w-11/12 h-full flex justify-between flex-wrap'>

                {
                    NeedType.map((item, index) => {
                        const { image, title } = item;
                        return (
                            <div key={index} className='w-96 h-auto'>
                                <img src={image} alt={title} className='object-cover h-10/12 w-full' />
                                <p className='my-5 underline cursor-pointer'>{title}</p>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default NeedTypeCard
