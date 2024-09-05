import React from 'react'
import "./Result.css"

// Dynamically import all images from the assets folder
const importAllImages = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

// Import images using require.context (loads all images from /src/assets)
const images = importAllImages(require.context('../assets/trial_img', false, /\.(jpeg)$/));

const Result = () => {
  return (
    <div className='maindiv'>
      <div>
        <div className="image-gallery">
          {images.map((imageSrc, index) => (
            <div key={index} className="image-item">
              <img src={imageSrc} alt={`${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Result