import React from 'react'
import "./Result.css"
import { useLocation } from 'react-router-dom';

// Dynamically import all images from the assets folder
const importAllImages = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

// Import images using require.context (loads all images from /src/assets)
const images = importAllImages(require.context('../assets/trial_img', false, /\.(jpeg)$/));

const Result = () => {

  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <div className='maindiv'>
      <div className="image-gallery">
        {images.map((imageSrc, index) => (
          <div key={index} className="image-item">
            <img src={imageSrc} alt={`${index + 1}`} />
          </div>
        ))}
      </div>
      <div className='subdiv'>
        <h3 className='heading1'>Prompt</h3>
        <div className='buttonsubdiv'>
          <span className='p1'>{formData.prompt}</span>
        </div>
      </div>
      <div className='subdiv'>
        <h3 className='heading1'>Style</h3>
        <div className='buttonsubdiv'>
          <span className='p1'>{formData.style}</span>
        </div>
      </div>
      <div className='subdiv'>
        <button className='button1'>Close</button>
      </div>
    </div>

  )
}

export default Result