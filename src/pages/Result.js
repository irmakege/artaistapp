import React from 'react'
import "./Result.css"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Result = () => {

  const location = useLocation()
  const { formData, resultData } = location.state || {};

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/');
  };

  console.log(resultData)

  return (
    <div className='mainresultdiv'>

      {formData.quantity === 1 ? (
        <div className="subdiv">
          {resultData.map((imageObj, index) => (
            <div key={index} className="item-style">
              <img
                src={`data:image/png;base64,${imageObj.b64}`}
                alt={`GeneratedImage${index}`}
                className="imagestyle"
              />
            </div>
          ))}
        </div>
      )
        :
        (
          <div className="image-gallery">
            {resultData.map((imageObj, index) => (
              <div key={index} className="item-style">
                <img
                  src={`data:image/png;base64,${imageObj.b64}`}
                  alt={`GeneratedImage${index}`}
                  className="image-style"
                />
              </div>
            ))}
          </div>
        )

      }
      <div className='resultsubdiv'>
        <h3 className='heading1'>Prompt</h3>
        <div className='buttonsubdiv'>
          <span className='p1'>{formData.prompts[0]}</span>
        </div>
      </div>

      <div className='resultsubdiv'>
        <h3 className='heading1'>Style</h3>
        <div className='buttonsubdiv'>
          <span className='p1'>{formData.styles[0]}</span>
        </div>
      </div>
      <div className='subdiv'>
        <button className='button1' onClick={handleSubmit} style={{ marginTop: "20px" }}>Close</button>
      </div>
    </div>

  )
}

export default Result