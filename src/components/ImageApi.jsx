import React from 'react'

const ImageApi = () => {
    const url = "https://api.unsplash.com/search/photos?query=men%20fashion&client_id=7Orb-kVFqsMTZr3MIcbD7HVAcBiElKTmn_OnYR3ThUc";

    const getImages = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
        } catch (error) {
            console.log(error);
        }
    }
    getImages();
    return (
        <div>

        </div>
    )
}

export default ImageApi
