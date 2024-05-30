import React, { useEffect, useState } from 'react'
export default function Men() {

    const client_id = '7Orb-kVFqsMTZr3MIcbD7HVAcBiElKTmn_OnYR3ThUc'
    const query = 'menfashion'
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}`;

    const [images, setImages] = useState([]);

    const getImages = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const imageUrls = data.results.map((elem) => elem.urls.small);
            setImages(imageUrls);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getImages(url);
    }, [])
    return (
        <>
            <div className='w-full min-h-screen pt-14 flex items-center justify-center'>
                <div className='flex w-11/12 h-auto flex-wrap gap-4 items-center'>
                    {
                        images.map((item, index) => {
                            return (
                                <div key={index} className='h-56 w-48 bg-slate-300'>
                                    <img src={item} alt="image" className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}